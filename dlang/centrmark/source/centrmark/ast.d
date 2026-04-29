module centrmark.ast;

// Tagged AST nodes. This keeps the canonical JSON representation stable and
// avoids runtime reflection across different implementations.

enum BlockKind
{
	Heading,
	Paragraph,
	CodeBlock,
	Blockquote,
	List,
	BlockDirective,
	VoidDirective,
}

enum InlineKind
{
	Text,
	Strong,
	Emphasis,
	CodeSpan,
	Link,
	SemanticLink,
	VariableRef,
	InlineDirective,
}

enum ListMarkerKind
{
	Unordered,
	Ordered,
}

struct Frontmatter
{
	string raw; // SDL payload as-is, with newlines normalized
}

struct AstInlineNode
{
	InlineKind kind;

	// Common fields (only some are used per kind)
	string text;
	string url;
	string variableName;
	string directiveName;
	string propsRaw;

	// For nested inline structures and directive payloads
	AstInlineNode[] children;
}

struct AstBlockHeading
{
	int level;
	AstInlineNode[] inlines;
}

struct AstBlockParagraph
{
	AstInlineNode[] inlines;
}

struct AstBlockCode
{
	string language;
	string code;
}

struct AstBlockquote
{
	AstBlock[] blocks;
}

struct AstListItem
{
	// Marker fields
	ListMarkerKind markerKind;
	string orderedValue; // e.g. "0." or "1."
	char unorderedChar;   // '-', '*', '+'

	// Item lead text (the part after the marker)
	AstInlineNode[] inlines;

	// Additional blocks attached to the item (continuations, code blocks, directives, etc.)
	AstBlock[] blocks;
}

struct AstListBlock
{
	AstListItem[] items;
}

struct AstVoidDirective
{
	string name;
	string propsRaw; // Optional, without surrounding []
}

struct AstBlockDirective
{
	// The number of ':' in the directive fence for open+close matching.
	int fenceLen;
	string name;
	string propsRaw; // Optional, without surrounding []
	AstBlock[] body;
}

struct AstBlock
{
	BlockKind kind;

	Frontmatter frontmatter; // Only for Document (in practice, unused here)
	bool hasFrontmatter;

	AstBlockHeading heading;
	AstBlockParagraph paragraph;
	AstBlockCode codeBlock;
	AstBlockquote blockquote;
	AstListBlock listBlock;
	AstVoidDirective voidDirective;
	AstBlockDirective blockDirective;
}

struct AstDocument
{
	bool hasFrontmatter;
	Frontmatter frontmatter;
	AstBlock[] blocks;
}

