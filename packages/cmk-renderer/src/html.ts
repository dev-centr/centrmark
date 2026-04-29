import type { RenderIRDocument, RenderInline, RenderListItem, RenderNode } from "./types";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInline(node: RenderInline): string {
  if (node.type === "text") return escapeHtml(node.text);
  if (node.type === "code") return `<code class="cmk-inline-code">${escapeHtml(node.text)}</code>`;
  if (node.type === "strong") return `<strong>${renderInlines(node.children)}</strong>`;
  if (node.type === "emphasis") return `<em>${renderInlines(node.children)}</em>`;
  if (node.type === "link") return `<a href="${escapeHtml(node.href)}">${renderInlines(node.children)}</a>`;
  if (node.type === "semanticLink") return `<a data-cmk-semantic-link="true" href="${escapeHtml(node.target)}">${renderInlines(node.children)}</a>`;
  return `<span data-cmk-inline-directive="${escapeHtml(node.name)}">${renderInlines(node.children)}</span>`;
}

function renderInlines(nodes: RenderInline[]): string {
  return nodes.map(renderInline).join("");
}

function renderListItem(item: RenderListItem): string {
  const children = item.children.length > 0 ? `<div class="cmk-list-item-children">${renderNodes(item.children)}</div>` : "";
  return `<li data-cmk-marker="${escapeHtml(item.markerValue)}">${renderInlines(item.inlines)}${children}</li>`;
}

function renderNode(node: RenderNode): string {
  if (node.type === "heading") {
    const level = Math.min(6, Math.max(1, node.level));
    return `<h${level}>${renderInlines(node.inlines)}</h${level}>`;
  }
  if (node.type === "paragraph") return `<p>${renderInlines(node.inlines)}</p>`;
  if (node.type === "blockquote") return `<blockquote>${renderNodes(node.children)}</blockquote>`;
  if (node.type === "codeBlock") {
    return `<pre><code class="language-${escapeHtml(node.language)}">${escapeHtml(node.code)}</code></pre>`;
  }
  if (node.type === "list") {
    const hasOrdered = node.items.some((item) => item.marker === "ordered");
    const tag = hasOrdered ? "ol" : "ul";
    return `<${tag}>${node.items.map(renderListItem).join("")}</${tag}>`;
  }
  if (node.type === "blockDirective") {
    return `<section data-cmk-directive="${escapeHtml(node.name)}" data-cmk-props="${escapeHtml(node.propsRaw)}">${renderNodes(node.children)}</section>`;
  }
  if (node.type === "voidDirective") {
    return `<div data-cmk-void-directive="${escapeHtml(node.name)}" data-cmk-props="${escapeHtml(node.propsRaw)}"></div>`;
  }
  return `<div data-cmk-unknown="${escapeHtml(node.sourceKind)}"></div>`;
}

function renderNodes(nodes: RenderNode[]): string {
  return nodes.map(renderNode).join("");
}

export function renderIRToHtml(document: RenderIRDocument): string {
  const frontmatter = document.frontmatterRaw
    ? `<pre class="cmk-frontmatter"><code>${escapeHtml(document.frontmatterRaw)}</code></pre>`
    : "";
  return `<article class="cmk-render">${frontmatter}${renderNodes(document.nodes)}</article>`;
}
