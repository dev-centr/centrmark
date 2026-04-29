export type CmkInline =
  | { kind: "Text"; text: string }
  | { kind: "CodeSpan"; text: string }
  | { kind: "Strong"; text?: string; children?: CmkInline[] }
  | { kind: "Emphasis"; text?: string; children?: CmkInline[] }
  | { kind: "Link"; url?: string; text?: string; children?: CmkInline[] }
  | { kind: "SemanticLink"; url?: string; text?: string; children?: CmkInline[] }
  | { kind: "InlineDirective"; directiveName?: string; propsRaw?: string; text?: string; children?: CmkInline[] };

export type CmkListItem = {
  markerKind?: "Unordered" | "Ordered";
  unorderedChar?: string;
  orderedValue?: string;
  inlines?: CmkInline[];
  blocks?: CmkBlock[];
};

export type CmkBlock =
  | { kind: "Heading"; level?: number; inlines?: CmkInline[] }
  | { kind: "Paragraph"; inlines?: CmkInline[] }
  | { kind: "Blockquote"; blocks?: CmkBlock[] }
  | { kind: "CodeBlock"; language?: string; code?: string }
  | { kind: "List"; items?: CmkListItem[] }
  | { kind: "BlockDirective"; name?: string; propsRaw?: string; body?: CmkBlock[] }
  | { kind: "VoidDirective"; name?: string; propsRaw?: string }
  | { kind: string; [key: string]: unknown };

export type CmkAstDocument = {
  hasFrontmatter?: boolean;
  frontmatter?: { raw?: string };
  blocks?: CmkBlock[];
};

export type RenderInline =
  | { type: "text"; text: string }
  | { type: "code"; text: string }
  | { type: "strong"; children: RenderInline[] }
  | { type: "emphasis"; children: RenderInline[] }
  | { type: "link"; href: string; children: RenderInline[] }
  | { type: "semanticLink"; target: string; children: RenderInline[] }
  | { type: "inlineDirective"; name: string; propsRaw: string; children: RenderInline[] };

export type RenderListItem = {
  marker: "unordered" | "ordered";
  markerValue: string;
  inlines: RenderInline[];
  children: RenderNode[];
};

export type RenderNode =
  | { type: "heading"; level: number; inlines: RenderInline[] }
  | { type: "paragraph"; inlines: RenderInline[] }
  | { type: "blockquote"; children: RenderNode[] }
  | { type: "codeBlock"; language: string; code: string }
  | { type: "list"; items: RenderListItem[] }
  | { type: "blockDirective"; name: string; propsRaw: string; children: RenderNode[] }
  | { type: "voidDirective"; name: string; propsRaw: string }
  | { type: "unknown"; sourceKind: string };

export type RenderIRDocument = {
  frontmatterRaw: string;
  nodes: RenderNode[];
};
