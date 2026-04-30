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

type ParsedProps = Record<string, string | boolean>;

function parseDirectiveProps(propsRaw: string): ParsedProps {
  const parsed: ParsedProps = {};
  const pattern = /([A-Za-z_][A-Za-z0-9_-]*)\s*=\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[^\s]+)/g;
  let match: RegExpExecArray | null = pattern.exec(propsRaw);
  while (match) {
    const key = match[1];
    let raw = match[2];
    if ((raw.startsWith("\"") && raw.endsWith("\"")) || (raw.startsWith("'") && raw.endsWith("'"))) {
      raw = raw.slice(1, -1);
    }
    const lower = raw.toLowerCase();
    if (lower === "true") parsed[key] = true;
    else if (lower === "false") parsed[key] = false;
    else parsed[key] = raw;
    match = pattern.exec(propsRaw);
  }
  return parsed;
}

function collectNodeText(nodes: RenderNode[]): string {
  return nodes.map(collectNodeTextSingle).join("\n");
}

function collectNodeTextSingle(node: RenderNode): string {
  if (node.type === "paragraph" || node.type === "heading") {
    return node.inlines.map(collectInlineText).join("");
  }
  if (node.type === "codeBlock") return node.code;
  if (node.type === "blockquote" || node.type === "blockDirective") return collectNodeText(node.children);
  if (node.type === "list") {
    return node.items
      .map((item) => `${item.markerValue} ${item.inlines.map(collectInlineText).join("")}\n${collectNodeText(item.children)}`)
      .join("\n");
  }
  return "";
}

function collectInlineText(inline: RenderInline): string {
  if (inline.type === "text" || inline.type === "code") return inline.text;
  if (inline.type === "link") return inline.children.map(collectInlineText).join("");
  if (inline.type === "semanticLink") return inline.children.map(collectInlineText).join("");
  if (inline.type === "inlineDirective") return inline.children.map(collectInlineText).join("");
  return inline.children.map(collectInlineText).join("");
}

type ChecklistItem = { marker: "unchecked" | "done" | "blocked" | "in-progress" | "custom"; label: string; markerRaw: string };

function parseChecklistItems(children: RenderNode[]): ChecklistItem[] {
  const text = collectNodeText(children);
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const match = line.match(/^\[([^\]])\]\s+(.+)$/);
      if (!match) return null;
      const raw = match[1];
      const label = match[2];
      if (raw === " ") return { marker: "unchecked" as const, label, markerRaw: raw };
      if (raw.toLowerCase() === "x") return { marker: "done" as const, label, markerRaw: raw };
      if (raw === "-") return { marker: "blocked" as const, label, markerRaw: raw };
      if (raw === "/") return { marker: "in-progress" as const, label, markerRaw: raw };
      return { marker: "custom" as const, label, markerRaw: raw };
    })
    .filter((item): item is ChecklistItem => item !== null);
}

function renderChecklistDirective(node: Extract<RenderNode, { type: "blockDirective" }>): string {
  const props = parseDirectiveProps(node.propsRaw);
  const checklistType = typeof props.type === "string" ? props.type : "default";
  const items = parseChecklistItems(node.children);
  if (items.length === 0) {
    return `<section data-cmk-directive="checklist" data-cmk-checklist-type="${escapeHtml(checklistType)}" data-cmk-props="${escapeHtml(node.propsRaw)}">${renderNodes(node.children)}</section>`;
  }
  const renderedItems = items
    .map((item) => {
      const strike = checklistType === "default" && item.marker === "blocked" ? " style=\"text-decoration: line-through;\"" : "";
      return `<li data-cmk-check="${escapeHtml(item.marker)}" data-cmk-check-raw="${escapeHtml(item.markerRaw)}"><span class="cmk-check-marker">[${escapeHtml(item.markerRaw)}]</span> <span class="cmk-check-label"${strike}>${escapeHtml(item.label)}</span></li>`;
    })
    .join("");
  return `<section data-cmk-directive="checklist" data-cmk-checklist-type="${escapeHtml(checklistType)}" data-cmk-props="${escapeHtml(node.propsRaw)}"><ul class="cmk-checklist">${renderedItems}</ul></section>`;
}

function renderDiagramDirective(node: Extract<RenderNode, { type: "blockDirective" }>): string {
  const props = parseDirectiveProps(node.propsRaw);
  const format = typeof props.format === "string" ? props.format.toLowerCase() : "mermaid";
  const src = typeof props.src === "string" ? props.src : "";
  const bodyText = collectNodeText(node.children).trim();
  if (src) {
    return `<figure data-cmk-directive="diagram" data-cmk-format="${escapeHtml(format)}" data-cmk-props="${escapeHtml(node.propsRaw)}"><img src="${escapeHtml(src)}" alt="${escapeHtml(String(props.alt ?? `${format} diagram`))}" /></figure>`;
  }
  if (format === "mermaid") {
    return `<figure data-cmk-directive="diagram" data-cmk-format="mermaid" data-cmk-props="${escapeHtml(node.propsRaw)}"><pre class="mermaid">${escapeHtml(bodyText)}</pre></figure>`;
  }
  if (format === "plantuml" || format === "graphviz" || format === "dot") {
    const lang = format === "dot" ? "graphviz" : format;
    return `<figure data-cmk-directive="diagram" data-cmk-format="${escapeHtml(format)}" data-cmk-props="${escapeHtml(node.propsRaw)}"><pre><code class="language-${escapeHtml(lang)}">${escapeHtml(bodyText)}</code></pre></figure>`;
  }
  return `<figure data-cmk-directive="diagram" data-cmk-format="${escapeHtml(format)}" data-cmk-props="${escapeHtml(node.propsRaw)}"><pre class="cmk-diagram-source">${escapeHtml(bodyText)}</pre></figure>`;
}

function renderAnimationDirective(node: Extract<RenderNode, { type: "blockDirective" }>): string {
  const props = parseDirectiveProps(node.propsRaw);
  const format = typeof props.format === "string" ? props.format.toLowerCase() : "lottie";
  const src = typeof props.src === "string" ? props.src : "";
  const autoplay = props.autoplay === true ? " autoplay" : "";
  const loop = props.loop === true ? " loop" : "";
  const controls = props.controls === true ? " controls" : "";

  if (format === "lottie" || format === "dotlottie") {
    return `<figure data-cmk-directive="animation" data-cmk-format="${escapeHtml(format)}" data-cmk-props="${escapeHtml(node.propsRaw)}"><lottie-player src="${escapeHtml(src)}"${autoplay}${loop}${controls}></lottie-player></figure>`;
  }
  if (format === "gif") {
    return `<figure data-cmk-directive="animation" data-cmk-format="gif" data-cmk-props="${escapeHtml(node.propsRaw)}"><img src="${escapeHtml(src)}" alt="${escapeHtml(String(props.alt ?? "Animated GIF"))}" /></figure>`;
  }
  return `<figure data-cmk-directive="animation" data-cmk-format="${escapeHtml(format)}" data-cmk-props="${escapeHtml(node.propsRaw)}"><video src="${escapeHtml(src)}"${autoplay}${loop}${controls}></video></figure>`;
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
    if (node.name === "checklist") return renderChecklistDirective(node);
    if (node.name === "diagram") return renderDiagramDirective(node);
    if (node.name === "animation") return renderAnimationDirective(node);
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
