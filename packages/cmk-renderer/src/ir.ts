import type {
  CmkAstDocument,
  CmkBlock,
  CmkInline,
  CmkListItem,
  RenderIRDocument,
  RenderInline,
  RenderListItem,
  RenderNode
} from "./types";

function mapInline(node: CmkInline): RenderInline {
  if (node.kind === "Text") {
    return { type: "text", text: node.text };
  }
  if (node.kind === "CodeSpan") {
    return { type: "code", text: node.text };
  }
  if (node.kind === "Strong") {
    return { type: "strong", children: mapInlines(node.children) };
  }
  if (node.kind === "Emphasis") {
    return { type: "emphasis", children: mapInlines(node.children) };
  }
  if (node.kind === "Link") {
    return {
      type: "link",
      href: node.url ?? "",
      children: mapInlines(node.children ?? [{ kind: "Text", text: node.text ?? node.url ?? "" }])
    };
  }
  if (node.kind === "SemanticLink") {
    return {
      type: "semanticLink",
      target: node.url ?? "",
      children: mapInlines(node.children ?? [{ kind: "Text", text: node.text ?? node.url ?? "" }])
    };
  }
  return {
    type: "inlineDirective",
    name: node.kind === "InlineDirective" ? node.directiveName ?? "" : "unknown",
    propsRaw: node.kind === "InlineDirective" ? node.propsRaw ?? "" : "",
    children: mapInlines(node.kind === "InlineDirective" ? node.children : undefined)
  };
}

function mapInlines(nodes: CmkInline[] | undefined): RenderInline[] {
  if (!nodes || nodes.length === 0) {
    return [];
  }
  return nodes.map(mapInline);
}

function mapListItem(item: CmkListItem): RenderListItem {
  return {
    marker: item.markerKind === "Ordered" ? "ordered" : "unordered",
    markerValue: item.markerKind === "Ordered" ? item.orderedValue ?? "1." : item.unorderedChar ?? "-",
    inlines: mapInlines(item.inlines),
    children: mapBlocks(item.blocks)
  };
}

function mapBlock(node: CmkBlock): RenderNode {
  if (node.kind === "Heading") {
    const heading = node as Extract<CmkBlock, { kind: "Heading" }>;
    return { type: "heading", level: heading.level ?? 1, inlines: mapInlines(heading.inlines) };
  }
  if (node.kind === "Paragraph") {
    const paragraph = node as Extract<CmkBlock, { kind: "Paragraph" }>;
    return { type: "paragraph", inlines: mapInlines(paragraph.inlines) };
  }
  if (node.kind === "Blockquote") {
    const quote = node as Extract<CmkBlock, { kind: "Blockquote" }>;
    return { type: "blockquote", children: mapBlocks(quote.blocks) };
  }
  if (node.kind === "CodeBlock") {
    const code = node as Extract<CmkBlock, { kind: "CodeBlock" }>;
    return { type: "codeBlock", language: code.language ?? "", code: code.code ?? "" };
  }
  if (node.kind === "List") {
    const list = node as Extract<CmkBlock, { kind: "List" }>;
    return { type: "list", items: (list.items ?? []).map(mapListItem) };
  }
  if (node.kind === "BlockDirective") {
    const directive = node as Extract<CmkBlock, { kind: "BlockDirective" }>;
    return {
      type: "blockDirective",
      name: directive.name ?? "",
      propsRaw: directive.propsRaw ?? "",
      children: mapBlocks(directive.body)
    };
  }
  if (node.kind === "VoidDirective") {
    const directive = node as Extract<CmkBlock, { kind: "VoidDirective" }>;
    return {
      type: "voidDirective",
      name: directive.name ?? "",
      propsRaw: directive.propsRaw ?? ""
    };
  }
  return { type: "unknown", sourceKind: node.kind };
}

function mapBlocks(nodes: CmkBlock[] | undefined): RenderNode[] {
  if (!nodes || nodes.length === 0) {
    return [];
  }
  return nodes.map(mapBlock);
}

export function astJsonToRenderIR(document: CmkAstDocument): RenderIRDocument {
  return {
    frontmatterRaw: document.frontmatter?.raw ?? "",
    nodes: mapBlocks(document.blocks)
  };
}
