module centrmark.json;

import centrmark.ast;

import std.array : appender, Appender;
import std.conv : to;
import std.parallelism : task;

private string escapeJson(string s)
{
	auto app = appender!string;
	for (size_t i = 0; i < s.length; i++)
	{
		auto c = s[i];
		switch (c)
		{
		case '\\':
			app.put("\\\\");
			break;
		case '"':
			app.put("\\\"");
			break;
		case '\n':
			app.put("\\n");
			break;
		case '\r':
			app.put("\\r");
			break;
		case '\t':
			app.put("\\t");
			break;
		default:
			// Keep MVP output compact. For non-ascii characters, just emit as-is.
			// (JSON supports UTF-8 directly.)
			app.put(c);
			break;
		}
	}
	return app.data;
}

private void putJsonString(Appender!string app, string s)
{
	app.put('"');
	app.put(escapeJson(s));
	app.put('"');
}

private void putInlineJson(Appender!string app, AstInlineNode n);
private void putBlockJson(Appender!string app, AstBlock b);

private void putInlineArray(Appender!string app, AstInlineNode[] arr)
{
	app.put('[');
	foreach (idx, elem; arr)
	{
		putInlineJson(app, elem);
		if (idx + 1 < arr.length)
			app.put(',');
	}
	app.put(']');
}

private void putBlockArray(Appender!string app, AstBlock[] arr)
{
	app.put('[');
	foreach (idx, elem; arr)
	{
		putBlockJson(app, elem);
		if (idx + 1 < arr.length)
			app.put(',');
	}
	app.put(']');
}

private void putInlineJson(Appender!string app, AstInlineNode n)
{
	app.put('{');
	putJsonString(app, "kind");
	app.put(':');

	switch (n.kind)
	{
	case InlineKind.Text:
		putJsonString(app, "Text");
		break;
	case InlineKind.Strong:
		putJsonString(app, "Strong");
		break;
	case InlineKind.Emphasis:
		putJsonString(app, "Emphasis");
		break;
	case InlineKind.CodeSpan:
		putJsonString(app, "CodeSpan");
		break;
	case InlineKind.Link:
		putJsonString(app, "Link");
		break;
	case InlineKind.SemanticLink:
		putJsonString(app, "SemanticLink");
		break;
	case InlineKind.VariableRef:
		putJsonString(app, "VariableRef");
		break;
	case InlineKind.InlineDirective:
		putJsonString(app, "InlineDirective");
		break;
	default:
		assert(0, "Unhandled inline kind (type label)");
		break;
	}

	// Re-open object with deterministic key order by just appending keys in order.
	app.put(',');
	putJsonString(app, "text");
	app.put(':');
	putJsonString(app, n.text);

	switch (n.kind)
	{
	case InlineKind.Text:
		// Text nodes only carry the "text" field serialized above.
		break;
	case InlineKind.Strong, InlineKind.Emphasis:
		app.put(',');
		putJsonString(app, "children");
		app.put(':');
		putInlineArray(app, n.children);
		break;

	case InlineKind.CodeSpan:
		break;

	case InlineKind.Link, InlineKind.SemanticLink:
		app.put(',');
		putJsonString(app, "url");
		app.put(':');
		putJsonString(app, n.url);
		app.put(',');
		putJsonString(app, "children");
		app.put(':');
		putInlineArray(app, n.children);
		break;

	case InlineKind.VariableRef:
		app.put(',');
		putJsonString(app, "variableName");
		app.put(':');
		putJsonString(app, n.variableName);
		break;

	case InlineKind.InlineDirective:
		app.put(',');
		putJsonString(app, "directiveName");
		app.put(':');
		putJsonString(app, n.directiveName);
		app.put(',');
		putJsonString(app, "propsRaw");
		app.put(':');
		putJsonString(app, n.propsRaw);
		app.put(',');
		putJsonString(app, "children");
		app.put(':');
		putInlineArray(app, n.children);
		break;
	default:
		assert(0, "Unhandled inline kind (payload)");
		break;
	}

	app.put('}');
}

private void putJsonInt(Appender!string app, string key, int v)
{
	putJsonString(app, key);
	app.put(':');
	app.put(to!string(v));
}

private void putJsonChar(Appender!string app, string key, char c)
{
	putJsonString(app, key);
	app.put(':');
	putJsonString(app, to!string(c));
}

private void putJsonBool(Appender!string app, string key, bool v)
{
	putJsonString(app, key);
	app.put(':');
	app.put(v ? "true" : "false");
}

private void putBlockJson(Appender!string app, AstBlock b)
{
	app.put('{');
	putJsonString(app, "kind");
	app.put(':');

	switch (b.kind)
	{
	case BlockKind.Heading:
		putJsonString(app, "Heading");
		break;
	case BlockKind.Paragraph:
		putJsonString(app, "Paragraph");
		break;
	case BlockKind.CodeBlock:
		putJsonString(app, "CodeBlock");
		break;
	case BlockKind.Blockquote:
		putJsonString(app, "Blockquote");
		break;
	case BlockKind.List:
		putJsonString(app, "List");
		break;
	case BlockKind.BlockDirective:
		putJsonString(app, "BlockDirective");
		break;
	case BlockKind.VoidDirective:
		putJsonString(app, "VoidDirective");
		break;
	default:
		assert(0, "Unhandled block kind (type label)");
		break;
	}

	app.put(',');
	putJsonBool(app, "hasFrontmatter", b.hasFrontmatter);

	switch (b.kind)
	{
	case BlockKind.Heading:
		app.put(',');
		putJsonInt(app, "level", b.heading.level);
		app.put(',');
		putJsonString(app, "inlines");
		app.put(':');
		putInlineArray(app, b.heading.inlines);
		break;

	case BlockKind.Paragraph:
		app.put(',');
		putJsonString(app, "inlines");
		app.put(':');
		putInlineArray(app, b.paragraph.inlines);
		break;

	case BlockKind.CodeBlock:
		app.put(',');
		putJsonString(app, "language");
		app.put(':');
		putJsonString(app, b.codeBlock.language);
		app.put(',');
		putJsonString(app, "code");
		app.put(':');
		putJsonString(app, b.codeBlock.code);
		break;

	case BlockKind.Blockquote:
		app.put(',');
		putJsonString(app, "blocks");
		app.put(':');
		putBlockArray(app, b.blockquote.blocks);
		break;

	case BlockKind.List:
		app.put(',');
		putJsonString(app, "items");
		app.put(':');
		app.put('[');
		foreach (idx, item; b.listBlock.items)
		{
			app.put('{');
			putJsonString(app, "markerKind");
			app.put(':');
			putJsonString(app, item.markerKind == ListMarkerKind.Unordered ? "Unordered" : "Ordered");
			app.put(',');
			if (item.markerKind == ListMarkerKind.Unordered)
			{
				putJsonChar(app, "unorderedChar", item.unorderedChar);
			}
			else
			{
				putJsonString(app, "orderedValue");
				app.put(':');
				putJsonString(app, item.orderedValue);
			}

			app.put(',');
			putJsonString(app, "inlines");
			app.put(':');
			putInlineArray(app, item.inlines);

			app.put(',');
			putJsonString(app, "blocks");
			app.put(':');
			putBlockArray(app, item.blocks);

			app.put('}');
			if (idx + 1 < b.listBlock.items.length)
				app.put(',');
		}
		app.put(']');
		break;

	case BlockKind.VoidDirective:
		app.put(',');
		putJsonString(app, "name");
		app.put(':');
		putJsonString(app, b.voidDirective.name);
		app.put(',');
		putJsonString(app, "propsRaw");
		app.put(':');
		putJsonString(app, b.voidDirective.propsRaw);
		break;

	case BlockKind.BlockDirective:
		app.put(',');
		putJsonInt(app, "fenceLen", b.blockDirective.fenceLen);
		app.put(',');
		putJsonString(app, "name");
		app.put(':');
		putJsonString(app, b.blockDirective.name);
		app.put(',');
		putJsonString(app, "propsRaw");
		app.put(':');
		putJsonString(app, b.blockDirective.propsRaw);
		app.put(',');
		putJsonString(app, "body");
		app.put(':');
		putBlockArray(app, b.blockDirective.body);
		break;
	default:
		assert(0, "Unhandled block kind (payload)");
		break;
	}

	app.put('}');
}

string toJsonCanonical(AstDocument doc)
{
	auto app = appender!string;

	app.put('{');
	putJsonBool(app, "hasFrontmatter", doc.hasFrontmatter);
	if (doc.hasFrontmatter)
	{
		app.put(',');
		putJsonString(app, "frontmatter");
		app.put(':');
		app.put('{');
		putJsonString(app, "raw");
		app.put(':');
		putJsonString(app, doc.frontmatter.raw);
		app.put('}');
	}

	app.put(',');
	putJsonString(app, "blocks");
	app.put(':');
	putBlockArray(app, doc.blocks);

	app.put('}');
	return app.data;
}

private string toJsonBlock(AstBlock b)
{
	auto app = appender!string;
	putBlockJson(app, b);
	return app.data;
}

// Optimized canonical JSON emission.
// Parsing remains single-threaded (cursor/indent-sensitive), but we parallelize
// serialization of top-level blocks for throughput.
string toJsonCanonicalOptimized(AstDocument doc)
{
	auto app = appender!string;

	app.put('{');
	putJsonBool(app, "hasFrontmatter", doc.hasFrontmatter);
	if (doc.hasFrontmatter)
	{
		app.put(',');
		putJsonString(app, "frontmatter");
		app.put(':');
		app.put('{');
		putJsonString(app, "raw");
		app.put(':');
		putJsonString(app, doc.frontmatter.raw);
		app.put('}');
	}

	app.put(',');
	putJsonString(app, "blocks");
	app.put(':');

	const size_t n = doc.blocks.length;
	app.put('[');

	alias BlockTask = typeof(task!toJsonBlock(AstBlock.init));
	auto tasks = new BlockTask[n];
	foreach (i, b; doc.blocks)
	{
		tasks[i] = task!toJsonBlock(b);
		tasks[i].executeInNewThread();
	}

	for (size_t i = 0; i < n; i++)
	{
		app.put(tasks[i].yieldForce);
		if (i + 1 < n)
			app.put(',');
	}

	app.put(']');
	app.put('}');
	return app.data;
}

