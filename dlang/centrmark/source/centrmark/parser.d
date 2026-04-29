module centrmark.parser;

import centrmark.ast;

import std.algorithm : startsWith;
import std.array : appender;
import std.string : strip, stripLeft, stripRight;

private size_t indexOfSubstring(string s, string needle, size_t start = 0)
{
	if (needle.length == 0)
		return start;
	if (needle.length > s.length)
		return size_t.max;

	for (size_t i = start; i + needle.length <= s.length; i++)
	{
		if (s[i .. i + needle.length] == needle)
			return i;
	}
	return size_t.max;
}

private size_t lastIndexOfChar(string s, char ch)
{
	for (size_t i = s.length; i > 0; i--)
	{
		if (s[i - 1] == ch)
			return i - 1;
	}
	return size_t.max;
}

private string[] splitLines(string normalized)
{
	// Split on '\n'. Input should already be normalized to '\n'.
	string[] result;
	size_t start = 0;
	for (size_t i = 0; i <= normalized.length; i++)
	{
		if (i == normalized.length || normalized[i] == '\n')
		{
			result ~= normalized[start .. i];
			start = i + 1;
		}
	}
	return result;
}

struct LineCursor
{
	string[] lines;
	size_t pos;

	@property bool empty()
	{
		return pos >= lines.length;
	}

	string peek()
	{
		return lines[pos];
	}

	string consume()
	{
		auto v = lines[pos];
		pos++;
		return v;
	}
}

private string normalizeNewlines(string input)
{
	// Normalize to '\n' to keep the AST stable across platforms.
	auto app = appender!string;
	for (size_t i = 0; i < input.length; i++)
	{
		auto c = input[i];
		if (c == '\r')
		{
			// Eat optional '\n' after '\r\n'.
			if (i + 1 < input.length && input[i + 1] == '\n')
				i++;
			app.put('\n');
		}
		else
		{
			app.put(c);
		}
	}
	return app.data;
}

private int leadingIndent(string line)
{
	int n = 0;
	for (size_t i = 0; i < line.length; i++)
	{
		auto c = line[i];
		if (c == ' ')
			n++;
		else if (c == '\t')
			n += 2;
		else
			break;
	}
	return n;
}

private bool isHeading(string trimmed, out int level, out string rest)
{
	level = 0;
	rest = "";

	if (trimmed.length == 0 || trimmed[0] != '#')
		return false;

	size_t i = 0;
	while (i < trimmed.length && trimmed[i] == '#')
	{
		level++;
		i++;
		if (level > 6)
			return false;
	}

	if (i >= trimmed.length || trimmed[i] != ' ')
		return false;

	rest = stripLeft(trimmed[i .. $]);
	return level >= 1;
}

private bool isCodeFenceStart(string trimmed)
{
	return startsWith(trimmed, "```");
}

private bool isCodeFenceEnd(string trimmed)
{
	return strip(trimmed) == "```";
}

private bool isBlockquoteOpen(string trimmed)
{
	return trimmed == "((";
}

private bool isBlockquoteClose(string trimmed)
{
	return trimmed == "))";
}

private bool isVoidDirectiveStart(string trimmed)
{
	// '::' but not ':::'
	return startsWith(trimmed, "::") && !startsWith(trimmed, ":::");
}

private bool isFenceLine(string trimmed, out int fenceLen)
{
	fenceLen = 0;
	if (trimmed.length < 3)
		return false;

	if (!startsWith(trimmed, "::"))
		return false;

	// Must start with at least ':::'
	while (fenceLen < trimmed.length && trimmed[fenceLen] == ':')
		fenceLen++;

	return fenceLen >= 3;
}

private string repeatColon(int n)
{
	auto app = appender!string;
	for (int i = 0; i < n; i++)
		app.put(':');
	return app.data;
}

private bool isClosingFence(string line, int fenceLen)
{
	auto trimmed = strip(line);
	return trimmed == repeatColon(fenceLen);
}

private bool isIdentifierChar(char c)
{
	return (c >= 'a' && c <= 'z')
		|| (c >= 'A' && c <= 'Z')
		|| (c >= '0' && c <= '9')
		|| c == '-'
		|| c == '_';
}

private bool parseIdentifier(string s, size_t start, out string ident, out size_t end)
{
	ident = "";
	end = start;
	if (start >= s.length)
		return false;
	if (!isIdentifierChar(s[start]))
		return false;

	auto i = start;
	while (i < s.length && isIdentifierChar(s[i]))
		i++;

	ident = s[start .. i];
	end = i;
	return true;
}

private bool isListMarker(string trimmed, out ListMarkerKind kind, out string orderedValue, out char unorderedChar, out size_t markerEnd)
{
	kind = ListMarkerKind.Unordered;
	orderedValue = "";
	unorderedChar = 0;
	markerEnd = 0;

	if (trimmed.length < 2)
		return false;

	auto c0 = trimmed[0];

	if (c0 == '-' || c0 == '*' || c0 == '+')
	{
		// Require a space after marker.
		if (trimmed[1] != ' ' && trimmed[1] != '\t')
			return false;
		kind = ListMarkerKind.Unordered;
		unorderedChar = c0;
		markerEnd = 1;
		return true;
	}

	// Ordered marker: digits '.' with a trailing space, plus special-cased '0.' allowed by the grammar.
	if (c0 < '0' || c0 > '9')
		return false;

	size_t i = 0;
	while (i < trimmed.length && trimmed[i] >= '0' && trimmed[i] <= '9')
		i++;
	if (i >= trimmed.length || trimmed[i] != '.')
		return false;
	if (i + 1 >= trimmed.length || (trimmed[i + 1] != ' ' && trimmed[i + 1] != '\t'))
		return false;

	kind = ListMarkerKind.Ordered;
	orderedValue = trimmed[0 .. i + 1]; // include dot
	unorderedChar = 0;
	markerEnd = i + 1;
	return true;
}

private bool findClosingFence(LineCursor cursor, int fenceLen, size_t fromPos, out size_t closePos)
{
	closePos = size_t.max;
	for (size_t i = fromPos; i < cursor.lines.length; i++)
	{
		if (isClosingFence(cursor.lines[i], fenceLen))
		{
			closePos = i;
			return true;
		}
	}
	return false;
}

private struct VoidOrDirectiveInfo
{
	string name;
	string propsRaw;
}

private VoidOrDirectiveInfo parseFenceLineInfo(string line, int fenceLen)
{
	auto trimmed = strip(line);
	auto after = trimmed.length >= fenceLen ? trimmed[fenceLen .. $] : "";
	after = stripLeft(after);

	VoidOrDirectiveInfo info;
	info.name = "";
	info.propsRaw = "";

	if (after.length == 0)
		return info;

	size_t endIdent;
	string ident;
	if (!parseIdentifier(after, 0, ident, endIdent))
		return info;

	info.name = ident;
	after = stripLeft(after[endIdent .. $]);

	// Optional [props]
	if (after.length > 0 && after[0] == '[')
	{
		auto close = lastIndexOfChar(after, ']');
		if (close != size_t.max && close > 0)
			info.propsRaw = strip(after[1 .. close]);
	}

	return info;
}

private bool isParagraphStop(string line, int currentIndent)
{
	auto trimmed = strip(line);
	if (trimmed.length == 0)
		return true;

	int indent = leadingIndent(line);
	if (indent < currentIndent)
		return true;

	// Block starts (all consume the whole line).
	int lvl; string rest;
	if (isHeading(trimmed, lvl, rest))
		return true;
	if (isCodeFenceStart(trimmed) || isCodeFenceEnd(trimmed))
		return true;
	if (isBlockquoteOpen(trimmed) || isBlockquoteClose(trimmed))
		return true;
	if (isFenceLine(trimmed, lvl))
		return true;
	if (isVoidDirectiveStart(trimmed))
		return true;

	ListMarkerKind mkKind; string ordered; char unordered; size_t markerEnd;
	if (isListMarker(trimmed, mkKind, ordered, unordered, markerEnd))
		return true;

	return false;
}

AstInlineNode[] parseInlines(string input)
{
	// Best-effort parsing for MVP subset. Unsupported constructs degrade to
	// plain Text nodes.
	string s = input;
	AstInlineNode[] nodes;

	size_t i = 0;
	while (i < s.length)
	{
		// Inline directive: @name [props] (content?)
		if (s[i] == '@')
		{
			size_t start = i;
			size_t j = i + 1;
			while (j < s.length && isIdentifierChar(s[j]))
				j++;
			if (j > i + 1)
			{
				AstInlineNode n;
				n.kind = InlineKind.InlineDirective;
				n.directiveName = s[start + 1 .. j];
				n.propsRaw = "";
				n.children = [];

				i = j;
				// Optional [props]
				if (i < s.length && s[i] == '[')
				{
					// Find close for this directive by scanning forward from i.
					size_t k = i + 1;
					size_t found = size_t.max;
					while (k < s.length)
					{
						if (s[k] == ']')
						{
							found = k;
							break;
						}
						k++;
					}
					if (found != size_t.max)
					{
						n.propsRaw = strip(s[i + 1 .. found]);
						i = found + 1;
					}
				}

				// Optional (content)
				if (i < s.length && s[i] == '(')
				{
					// MVP: no nested parentheses. Find the next ')'.
					size_t closeParen = i + 1;
					while (closeParen < s.length && s[closeParen] != ')')
						closeParen++;
					if (closeParen < s.length && s[closeParen] == ')')
					{
						auto content = s[i + 1 .. closeParen];
						n.children = parseInlines(content);
						i = closeParen + 1;
					}
					else
					{
						// Unterminated; fall back to raw text.
						AstInlineNode t;
						t.kind = InlineKind.Text;
						t.text = s[start .. $];
						nodes ~= t;
						return nodes;
					}
				}

				nodes ~= n;
				continue;
			}
		}

		// Variable ref: ${name}
		if (s[i] == '$' && i + 1 < s.length && s[i + 1] == '{')
		{
			size_t j = i + 2;
			while (j < s.length && isIdentifierChar(s[j]))
				j++;
			if (j < s.length && s[j] == '}')
			{
				AstInlineNode n;
				n.kind = InlineKind.VariableRef;
				n.variableName = s[i + 2 .. j];
				n.children = [];
				nodes ~= n;
				i = j + 1;
				continue;
			}
		}

		// Code span: `...`
		if (s[i] == '`')
		{
			size_t start = i + 1;
			size_t close = start;
			while (close < s.length && s[close] != '`')
				close++;
			if (close < s.length && s[close] == '`')
			{
				AstInlineNode n;
				n.kind = InlineKind.CodeSpan;
				n.text = s[start .. close];
				n.children = [];
				nodes ~= n;
				i = close + 1;
				continue;
			}
		}

		// Strong: **...** or __...__
		if (i + 1 < s.length && (s[i .. i + 2] == "**" || s[i .. i + 2] == "__"))
		{
			auto delim = s[i .. i + 2];
			size_t start = i + 2;
			size_t close = start;
			while (close + 1 < s.length)
			{
				if (s[close .. close + 2] == delim)
					break;
				close++;
			}
			if (close + 1 < s.length && s[close .. close + 2] == delim)
			{
				auto inner = s[start .. close];
				AstInlineNode n;
				n.kind = InlineKind.Strong;
				n.children = parseInlines(inner);
				nodes ~= n;
				i = close + 2;
				continue;
			}
		}

		// Emphasis: *...* or _..._
		if (s[i] == '*' || s[i] == '_')
		{
			// Avoid consuming strong.
			if (i + 1 < s.length && s[i + 1] == s[i])
			{
				// Let the strong handler catch it next iteration.
			}
			else
			{
				char delim = s[i];
				size_t start = i + 1;
				size_t close = start;
				while (close < s.length && s[close] != delim)
					close++;
				if (close < s.length && s[close] == delim)
				{
					auto inner = s[start .. close];
					AstInlineNode n;
					n.kind = InlineKind.Emphasis;
					n.children = parseInlines(inner);
					nodes ~= n;
					i = close + 1;
					continue;
				}
			}
		}

		// Link: [text](url)
		if (s[i] == '[')
		{
			// Semantic link: [[url]] or [[url | text]]
			if (i + 1 < s.length && s[i + 1] == '[')
			{
				size_t close = i + 2;
				while (close + 1 < s.length && s[close .. close + 2] != "]]")
					close++;
				if (close + 1 < s.length && s[close .. close + 2] == "]]")
				{
					auto inside = s[i + 2 .. close];
					string url;
					AstInlineNode[] textNodes;
					auto pipe = indexOfSubstring(inside, " | ");
					if (pipe != size_t.max)
					{
						url = inside[0 .. pipe];
						auto textPart = inside[pipe + 3 .. $];
						textNodes = parseInlines(textPart);
					}
					else
					{
						url = strip(inside);
						textNodes = [];
					}

					AstInlineNode n;
					n.kind = InlineKind.SemanticLink;
					n.url = strip(url);
					n.children = textNodes;
					nodes ~= n;
					i = close + 2;
					continue;
				}
			}

			// Regular link
			size_t closeBracket = i + 1;
			while (closeBracket < s.length && s[closeBracket] != ']')
				closeBracket++;
			if (closeBracket < s.length && s[closeBracket] == ']' && closeBracket + 1 < s.length && s[closeBracket + 1] == '(')
			{
				size_t closeParen = closeBracket + 2;
				while (closeParen < s.length && s[closeParen] != ')')
					closeParen++;
				if (closeParen < s.length && s[closeParen] == ')')
				{
					auto linkTextRaw = s[i + 1 .. closeBracket];
					auto urlRaw = s[closeBracket + 2 .. closeParen];

					AstInlineNode n;
					n.kind = InlineKind.Link;
					n.url = strip(urlRaw);
					n.children = parseInlines(linkTextRaw);
					nodes ~= n;
					i = closeParen + 1;
					continue;
				}
			}
		}

		// Fallback: accumulate a run of plain text until the next special char.
		size_t start = i;
		while (i < s.length)
		{
			auto ch = s[i];
			if (ch == '@' || ch == '$' || ch == '`' || ch == '[' || ch == '*' || ch == '_' )
				break;
			i++;
		}
		if (i == start)
			i++;

		AstInlineNode n;
		n.kind = InlineKind.Text;
		n.text = s[start .. i];
		n.children = [];
		nodes ~= n;
	}

	return nodes;
}

private bool tryParseVoidOrBlockDirective(ref LineCursor cursor, size_t currentIndent, out AstBlock outBlock)
{
	outBlock = AstBlock.init;
	auto rawLine = cursor.peek();
	auto trimmed = strip(rawLine);

	// Void directive starts with '::' not ':::'
	if (isVoidDirectiveStart(trimmed))
	{
		string rest = trimmed[2 .. $];
		rest = stripLeft(rest);

		AstVoidDirective vd;
		vd.name = "";
		vd.propsRaw = "";

		size_t endIdent;
		string ident;
		if (parseIdentifier(rest, 0, ident, endIdent))
		{
			vd.name = ident;
			auto afterIdent = stripLeft(rest[endIdent .. $]);
			if (afterIdent.length > 0 && afterIdent[0] == '[')
			{
				auto close = lastIndexOfChar(afterIdent, ']');
				if (close != size_t.max && close > 0)
					vd.propsRaw = strip(afterIdent[1 .. close]);
			}
		}

		cursor.consume();

		AstBlock b;
		b.kind = BlockKind.VoidDirective;
		b.hasFrontmatter = false;
		b.voidDirective = vd;
		outBlock = b;
		return true;
	}

	// Block/void directive fence: starts with 3+ colons.
	int fenceLen;
	if (!isFenceLine(trimmed, fenceLen))
		return false;

	// Decide: block directive if we can find a matching closing fence.
	size_t closePos;
	if (findClosingFence(cursor, fenceLen, cursor.pos + 1, closePos))
	{
		auto info = parseFenceLineInfo(rawLine, fenceLen);
		// Consume opening
		cursor.consume();

		AstBlockDirective bd;
		bd.fenceLen = fenceLen;
		bd.name = info.name;
		bd.propsRaw = info.propsRaw;
		bd.body = [];

		while (!cursor.empty)
		{
			auto line = cursor.peek();
			auto t = strip(line);

			if (isClosingFence(line, fenceLen))
			{
				cursor.consume();
				break;
			}

			if (strip(line).length == 0)
			{
				cursor.consume();
				continue;
			}

			AstBlock child = parseBlock(cursor, 0);
			bd.body ~= child;
		}

		AstBlock block;
		block.kind = BlockKind.BlockDirective;
		block.hasFrontmatter = false;
		block.blockDirective = bd;
		outBlock = block;
		return true;
	}

	// Fallback: treat as a void directive (covers cases where an author uses '::: name' as a one-liner).
	auto info = parseFenceLineInfo(rawLine, fenceLen);
	cursor.consume();

	AstVoidDirective vd;
	vd.name = info.name;
	vd.propsRaw = info.propsRaw;

	AstBlock b;
	b.kind = BlockKind.VoidDirective;
	b.hasFrontmatter = false;
	b.voidDirective = vd;
	outBlock = b;
	return true;
}

private AstBlock parseListItemParagraph(ref LineCursor cursor, int baseIndent)
{
	// Used for paragraph continuation inside list items.
	string first = cursor.consume();
	string accum = strip(first);

	while (!cursor.empty)
	{
		auto nextLine = cursor.peek();
		auto trimmed = strip(nextLine);
		if (trimmed.length == 0)
			break;

		int nextIndent = leadingIndent(nextLine);
		if (nextIndent < baseIndent)
			break;

		// Stop before block markers in this MVP subset.
		int lvl; string rest;
		if (isHeading(trimmed, lvl, rest))
			break;
		if (isCodeFenceStart(trimmed) || isCodeFenceEnd(trimmed))
			break;
		if (isBlockquoteOpen(trimmed) || isBlockquoteClose(trimmed))
			break;

		ListMarkerKind mkKind; string ordered; char unordered; size_t markerEnd;
		if (nextIndent == baseIndent && isListMarker(trimmed, mkKind, ordered, unordered, markerEnd))
			break;

		// Directives start a block.
		int fenceLen;
		if (isFenceLine(trimmed, fenceLen) || isVoidDirectiveStart(trimmed))
			break;

		if (cursor.pos + 1 <= cursor.lines.length)
		{
			accum ~= "\n";
			cursor.consume();
		}
		else
		{
			cursor.consume();
		}
	}

	AstBlock p;
	p.kind = BlockKind.Paragraph;
	p.hasFrontmatter = false;
	p.paragraph = AstBlockParagraph(parseInlines(accum));
	return p;
}

private AstBlock parseBlockquote(ref LineCursor cursor, int currentIndent)
{
	// Consume the opening '((' line.
	cursor.consume();

	AstBlockquote q;
	q.blocks = [];

	while (!cursor.empty)
	{
		auto line = cursor.peek();
		auto t = strip(line);
		if (t.length == 0)
		{
			cursor.consume();
			continue;
		}

		if (isBlockquoteClose(t))
		{
			cursor.consume();
			break;
		}

		AstBlock child = parseBlock(cursor, currentIndent);
		q.blocks ~= child;
	}

	AstBlock b;
	b.kind = BlockKind.Blockquote;
	b.hasFrontmatter = false;
	b.blockquote = q;
	return b;
}

private AstBlock parseCodeBlock(ref LineCursor cursor)
{
	auto openLine = strip(cursor.consume());
	auto lang = "";
	if (openLine.length > 3)
		lang = strip(openLine[3 .. $]);

	string codeAccum;
	while (!cursor.empty)
	{
		auto line = cursor.peek();
		auto t = strip(line);
		if (isCodeFenceEnd(t))
		{
			cursor.consume();
			break;
		}

		codeAccum ~= cursor.consume() ~ "\n";
	}

	AstBlock b;
	b.kind = BlockKind.CodeBlock;
	b.hasFrontmatter = false;
	b.codeBlock = AstBlockCode(lang, codeAccum);
	return b;
}

private AstBlock parseParagraph(ref LineCursor cursor, int currentIndent)
{
	string first = cursor.consume();
	string accum = strip(first);

	while (!cursor.empty)
	{
		auto nextLine = cursor.peek();
		auto trimmed = strip(nextLine);

		if (trimmed.length == 0)
			break;

		if (isParagraphStop(nextLine, currentIndent))
			break;

		accum ~= "\n";
		cursor.consume();
	}

	AstBlock b;
	b.kind = BlockKind.Paragraph;
	b.hasFrontmatter = false;
	b.paragraph = AstBlockParagraph(parseInlines(accum));
	return b;
}

private AstBlock parseList(ref LineCursor cursor)
{
	// Minimal single-level list parsing.
	int baseIndent = leadingIndent(cursor.peek());

	AstListBlock list;
	list.items = [];

	while (!cursor.empty)
	{
		// Skip blank lines within list.
		if (strip(cursor.peek()).length == 0)
		{
			cursor.consume();
			continue;
		}

		int indent = leadingIndent(cursor.peek());
		auto trimmed = strip(cursor.peek());

		if (indent < baseIndent)
			break;

		ListMarkerKind mkKind; string ordered; char unordered; size_t markerEnd;
		if (indent == baseIndent && isListMarker(trimmed, mkKind, ordered, unordered, markerEnd))
		{
			// Parse item lead line.
			cursor.consume();
			auto afterMarker = stripLeft(trimmed[markerEnd + 1 .. $]);

			AstListItem item;
			item.markerKind = mkKind;
			item.orderedValue = ordered;
			item.unorderedChar = unordered;
			item.inlines = parseInlines(afterMarker);
			item.blocks = [];

			// Parse continuations until the next item at the same indent.
			while (!cursor.empty)
			{
				if (strip(cursor.peek()).length == 0)
				{
					cursor.consume();
					continue;
				}

				int nextIndent = leadingIndent(cursor.peek());
				auto nextTrimmed = strip(cursor.peek());
				if (nextIndent < baseIndent)
					break;

				// '+' continuation separator is ignored.
				if (nextIndent == baseIndent && nextTrimmed == "+")
				{
					cursor.consume();
					continue;
				}

				// New list item.
				if (nextIndent == baseIndent && isListMarker(nextTrimmed, mkKind, ordered, unordered, markerEnd))
					break;

				// Otherwise, accept blocks at or deeper than baseIndent.
				if (isCodeFenceStart(nextTrimmed))
				{
					item.blocks ~= parseCodeBlock(cursor);
					continue;
				}
				if (isBlockquoteOpen(nextTrimmed))
				{
					item.blocks ~= parseBlockquote(cursor, baseIndent);
					continue;
				}
				int fenceLen;
				if (isFenceLine(nextTrimmed, fenceLen) || isVoidDirectiveStart(nextTrimmed))
				{
					AstBlock dirChild;
					// currentIndent doesn't matter here; directives are line-based.
					if (tryParseVoidOrBlockDirective(cursor, baseIndent, dirChild))
						item.blocks ~= dirChild;
					else
						item.blocks ~= parseParagraph(cursor, baseIndent);
					continue;
				}

				// Paragraph continuation.
				item.blocks ~= parseListItemParagraph(cursor, baseIndent);
			}

			list.items ~= item;
			continue;
		}

		// Not a new item at base indent: end list.
		if (indent == baseIndent)
			break;

		break;
	}

	AstBlock b;
	b.kind = BlockKind.List;
	b.hasFrontmatter = false;
	b.listBlock = list;
	return b;
}

AstBlock parseBlock(ref LineCursor cursor, int currentIndent)
{
	// Skip leading blank lines.
	while (!cursor.empty && strip(cursor.peek()).length == 0)
		cursor.consume();

	if (cursor.empty)
		return AstBlock.init;

	auto raw = cursor.peek();
	auto trimmed = strip(raw);
	auto indent = leadingIndent(raw);

	// Headings
	int level; string rest;
	if (isHeading(trimmed, level, rest))
	{
		cursor.consume();
		AstBlock b;
		b.kind = BlockKind.Heading;
		b.hasFrontmatter = false;
		b.heading = AstBlockHeading(level, parseInlines(rest));
		return b;
	}

	// Code blocks
	if (isCodeFenceStart(trimmed))
	{
		return parseCodeBlock(cursor);
	}

	// Blockquotes
	if (isBlockquoteOpen(trimmed))
		return parseBlockquote(cursor, currentIndent);

	// Directives (void or fenced)
	AstBlock directiveBlock;
	if (tryParseVoidOrBlockDirective(cursor, currentIndent, directiveBlock))
		return directiveBlock;

	// Lists
	ListMarkerKind mkKind; string ordered; char unordered; size_t markerEnd;
	if (isListMarker(trimmed, mkKind, ordered, unordered, markerEnd))
	{
		// For MVP, parse lists only when the marker is at or deeper than currentIndent.
		// (Top-level lists will have currentIndent=0.)
		if (indent >= currentIndent)
			return parseList(cursor);
	}

	// Paragraph (includes plain inline text, and any inline constructs)
	return parseParagraph(cursor, currentIndent);
}

AstDocument parseCmk(string input)
{
	auto normalized = normalizeNewlines(input);
	auto lines = splitLines(normalized);

	LineCursor cursor;
	cursor.lines = lines;
	cursor.pos = 0;

	AstDocument doc;
	doc.hasFrontmatter = false;
	doc.frontmatter = Frontmatter.init;
	doc.blocks = [];

	// Optional frontmatter only at the beginning.
	if (!cursor.empty && strip(cursor.peek()) == "---")
	{
		doc.hasFrontmatter = true;
		cursor.consume(); // opening ---

		auto app = appender!string;
		while (!cursor.empty)
		{
			if (strip(cursor.peek()) == "---")
			{
				cursor.consume(); // closing ---
				break;
			}
			app.put(cursor.consume());
			app.put("\n");
		}

		doc.frontmatter = Frontmatter(app.data);
	}

	while (!cursor.empty)
	{
		auto t = strip(cursor.peek());
		if (t.length == 0)
		{
			cursor.consume();
			continue;
		}

		doc.blocks ~= parseBlock(cursor, 0);
	}

	return doc;
}

