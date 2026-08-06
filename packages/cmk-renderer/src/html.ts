import type {
  RenderIRDocument,
  RenderInline,
  RenderListItem,
  RenderNode,
  RenderSourceEntry
} from "./types.js";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

/** Parse SDL-like body fields: `title "..."`, `url=...`, etc. */
function parseBodyFields(text: string): Record<string, string> {
  const fields: Record<string, string> = {};
  const pattern =
    /([A-Za-z_][A-Za-z0-9_-]*)\s*(?:=\s*)?("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[^\s]+)/g;
  let match: RegExpExecArray | null = pattern.exec(text);
  while (match) {
    const key = match[1];
    let raw = match[2];
    if ((raw.startsWith("\"") && raw.endsWith("\"")) || (raw.startsWith("'") && raw.endsWith("'"))) {
      raw = raw.slice(1, -1);
    }
    fields[key] = raw;
    match = pattern.exec(text);
  }
  return fields;
}

function collectNodeText(nodes: RenderNode[]): string {
  return nodes.map(collectNodeTextSingle).join("\n");
}

function collectNodeTextSingle(node: RenderNode): string {
  if (node.type === "paragraph" || node.type === "heading") {
    return node.inlines.map(collectInlineText).join("");
  }
  if (node.type === "codeBlock") return node.code;
  if (node.type === "blockquote" || node.type === "blockDirective" || node.type === "sources") {
    return node.type === "sources" ? "" : collectNodeText(node.children);
  }
  if (node.type === "list") {
    return node.items
      .map(
        (item: RenderListItem) =>
          `${item.markerValue} ${item.inlines.map(collectInlineText).join("")}\n${collectNodeText(item.children)}`
      )
      .join("\n");
  }
  return "";
}

function collectInlineText(inline: RenderInline): string {
  if (inline.type === "text" || inline.type === "code") return inline.text;
  if (inline.type === "citation") return inline.keys.join(",");
  if (
    inline.type === "link" ||
    inline.type === "semanticLink" ||
    inline.type === "strong" ||
    inline.type === "emphasis" ||
    inline.type === "inlineDirective"
  ) {
    return inline.children.map(collectInlineText).join("");
  }
  return "";
}

type ChecklistItem = {
  marker: "unchecked" | "done" | "blocked" | "in-progress" | "custom";
  label: string;
  markerRaw: string;
};

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

function sourceEntryFromDirective(
  propsRaw: string,
  children: RenderNode[]
): RenderSourceEntry | null {
  const props = parseDirectiveProps(propsRaw);
  const body = parseBodyFields(collectNodeText(children));
  const key = String(props.key ?? body.key ?? "").trim();
  if (!key) return null;
  const extra: Record<string, string> = {};
  for (const [k, v] of Object.entries(body)) {
    if (k === "title" || k === "url" || k === "accessed" || k === "key" || k === "type") continue;
    extra[k] = v;
  }
  return {
    key,
    sourceType: String(props.type ?? body.type ?? "webpage"),
    title: String(body.title ?? props.title ?? key),
    url: String(body.url ?? props.url ?? ""),
    accessed: String(body.accessed ?? props.accessed ?? ""),
    extra
  };
}

function collectSourceEntries(nodes: RenderNode[]): RenderSourceEntry[] {
  const entries: RenderSourceEntry[] = [];
  const seen = new Set<string>();

  function add(entry: RenderSourceEntry | null): void {
    if (!entry || seen.has(entry.key)) return;
    seen.add(entry.key);
    entries.push(entry);
  }

  function walk(list: RenderNode[]): void {
    for (const node of list) {
      if (node.type === "blockDirective" && node.name.toLowerCase() === "source") {
        add(sourceEntryFromDirective(node.propsRaw, node.children));
      }
      if (node.type === "blockDirective" && node.name.toLowerCase() === "sources") {
        walk(node.children);
      }
      if (node.type === "sources") {
        for (const entry of node.entries) add(entry);
      }
      if (node.type === "blockquote" || node.type === "blockDirective") {
        walk(node.children);
      }
      if (node.type === "list") {
        for (const item of node.items) walk(item.children);
      }
    }
  }

  walk(nodes);
  return entries;
}

type RenderContext = {
  sourcesByKey: Map<string, RenderSourceEntry>;
  citationOrder: string[];
  citationIndex: Map<string, number>;
  sourcesEmitted: boolean;
  missingKeys: Set<string>;
};

function ensureCitationIndex(ctx: RenderContext, key: string): number {
  const existing = ctx.citationIndex.get(key);
  if (existing !== undefined) return existing;
  if (!ctx.sourcesByKey.has(key)) {
    ctx.missingKeys.add(key);
  }
  const next = ctx.citationOrder.length + 1;
  ctx.citationOrder.push(key);
  ctx.citationIndex.set(key, next);
  return next;
}

function renderCitation(ctx: RenderContext, keys: string[]): string {
  if (keys.length === 0) {
    return `<sup class="cmk-cite cmk-cite-missing" title="Missing citation key">?</sup>`;
  }
  const links = keys
    .map((key) => {
      const index = ensureCitationIndex(ctx, key);
      const missing = !ctx.sourcesByKey.has(key);
      const cls = missing ? "cmk-cite cmk-cite-missing" : "cmk-cite";
      const title = missing ? ` title="Missing source: ${escapeHtml(key)}"` : "";
      return `<a class="${cls}" href="#cmk-source-${escapeHtml(key)}"${title}>${index}</a>`;
    })
    .join(",");
  return `<sup class="cmk-cites">${links}</sup>`;
}

function renderSourcesSection(
  ctx: RenderContext,
  title: string,
  preferredOrder: string[] | null
): string {
  ctx.sourcesEmitted = true;
  const order =
    preferredOrder && preferredOrder.length > 0
      ? preferredOrder
      : [
          ...ctx.citationOrder,
          ...[...ctx.sourcesByKey.keys()].filter((k) => !ctx.citationOrder.includes(k))
        ];
  const items = order
    .map((key) => {
      const entry = ctx.sourcesByKey.get(key);
      const index = ctx.citationIndex.get(key) ?? ensureCitationIndex(ctx, key);
      if (!entry) {
        return `<li id="cmk-source-${escapeHtml(key)}" class="cmk-source cmk-source-missing" data-cmk-source-key="${escapeHtml(key)}"><span class="cmk-source-index">[${index}]</span> <em>Missing source:</em> ${escapeHtml(key)}</li>`;
      }
      const link = entry.url
        ? `<a href="${escapeHtml(entry.url)}" rel="noopener noreferrer">${escapeHtml(entry.title)}</a>`
        : escapeHtml(entry.title);
      const accessed = entry.accessed
        ? ` <span class="cmk-source-accessed">(accessed ${escapeHtml(entry.accessed)})</span>`
        : "";
      const type = entry.sourceType
        ? ` <span class="cmk-source-type">[${escapeHtml(entry.sourceType)}]</span>`
        : "";
      return `<li id="cmk-source-${escapeHtml(key)}" class="cmk-source" data-cmk-source-key="${escapeHtml(key)}" data-cmk-source-type="${escapeHtml(entry.sourceType)}"><span class="cmk-source-index">[${index}]</span> ${link}${type}${accessed}</li>`;
    })
    .join("");
  return `<section class="cmk-sources" data-cmk-directive="sources"><h2 class="cmk-sources-title">${escapeHtml(title)}</h2><ol class="cmk-sources-list">${items}</ol></section>`;
}

function renderInline(ctx: RenderContext, node: RenderInline): string {
  if (node.type === "text") return escapeHtml(node.text);
  if (node.type === "code") return `<code class="cmk-inline-code">${escapeHtml(node.text)}</code>`;
  if (node.type === "strong") return `<strong>${renderInlines(ctx, node.children)}</strong>`;
  if (node.type === "emphasis") return `<em>${renderInlines(ctx, node.children)}</em>`;
  if (node.type === "link") {
    return `<a href="${escapeHtml(node.href)}">${renderInlines(ctx, node.children)}</a>`;
  }
  if (node.type === "semanticLink") {
    return `<a data-cmk-semantic-link="true" href="${escapeHtml(node.target)}">${renderInlines(ctx, node.children)}</a>`;
  }
  if (node.type === "citation") return renderCitation(ctx, node.keys);
  if (node.type === "inlineDirective" && node.name.toLowerCase() === "cite") {
    return renderCitation(ctx, parseCitationKeysFromProps(node.propsRaw));
  }
  return `<span data-cmk-inline-directive="${escapeHtml(node.name)}">${renderInlines(ctx, node.children)}</span>`;
}

function parseCitationKeysFromProps(propsRaw: string): string[] {
  const keysProp = /(?:^|\s)keys\s*=\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[^\s]+)/i.exec(propsRaw);
  const keyProp = /(?:^|\s)key\s*=\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[^\s]+)/i.exec(propsRaw);
  const raw = keysProp?.[1] ?? keyProp?.[1] ?? "";
  let value = raw;
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  return value
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

function renderInlines(ctx: RenderContext, nodes: RenderInline[]): string {
  return nodes.map((n) => renderInline(ctx, n)).join("");
}

function renderChecklistDirective(
  ctx: RenderContext,
  node: Extract<RenderNode, { type: "blockDirective" }>
): string {
  const props = parseDirectiveProps(node.propsRaw);
  const checklistType = typeof props.type === "string" ? props.type : "default";
  const items = parseChecklistItems(node.children);
  if (items.length === 0) {
    return `<section data-cmk-directive="checklist" data-cmk-checklist-type="${escapeHtml(checklistType)}" data-cmk-props="${escapeHtml(node.propsRaw)}">${renderNodes(ctx, node.children)}</section>`;
  }
  const renderedItems = items
    .map((item) => {
      const strike =
        checklistType === "default" && item.marker === "blocked"
          ? " style=\"text-decoration: line-through;\""
          : "";
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

function renderListItem(ctx: RenderContext, item: RenderListItem): string {
  const children =
    item.children.length > 0
      ? `<div class="cmk-list-item-children">${renderNodes(ctx, item.children)}</div>`
      : "";
  return `<li data-cmk-marker="${escapeHtml(item.markerValue)}">${renderInlines(ctx, item.inlines)}${children}</li>`;
}

function renderSourcesBlock(
  ctx: RenderContext,
  node: Extract<RenderNode, { type: "blockDirective" }>
): string {
  const props = parseDirectiveProps(node.propsRaw);
  const title = typeof props.title === "string" ? props.title : "Sources";
  const order: string[] = [];
  for (const child of node.children) {
    if (child.type === "blockDirective" && child.name.toLowerCase() === "source") {
      const entry = sourceEntryFromDirective(child.propsRaw, child.children);
      if (entry) {
        ctx.sourcesByKey.set(entry.key, entry);
        order.push(entry.key);
      }
    }
  }
  return renderSourcesSection(ctx, title, order);
}

function renderNode(ctx: RenderContext, node: RenderNode): string {
  if (node.type === "heading") {
    const level = Math.min(6, Math.max(1, node.level));
    return `<h${level}>${renderInlines(ctx, node.inlines)}</h${level}>`;
  }
  if (node.type === "paragraph") return `<p>${renderInlines(ctx, node.inlines)}</p>`;
  if (node.type === "blockquote") return `<blockquote>${renderNodes(ctx, node.children)}</blockquote>`;
  if (node.type === "codeBlock") {
    return `<pre><code class="language-${escapeHtml(node.language)}">${escapeHtml(node.code)}</code></pre>`;
  }
  if (node.type === "list") {
    const hasOrdered = node.items.some((item: RenderListItem) => item.marker === "ordered");
    const tag = hasOrdered ? "ol" : "ul";
    return `<${tag}>${node.items.map((item: RenderListItem) => renderListItem(ctx, item)).join("")}</${tag}>`;
  }
  if (node.type === "sources") {
    for (const entry of node.entries) ctx.sourcesByKey.set(entry.key, entry);
    return renderSourcesSection(
      ctx,
      node.title,
      node.entries.map((e: RenderSourceEntry) => e.key)
    );
  }
  if (node.type === "blockDirective") {
    const name = node.name.toLowerCase();
    if (name === "checklist") return renderChecklistDirective(ctx, node);
    if (name === "diagram") return renderDiagramDirective(node);
    if (name === "animation") return renderAnimationDirective(node);
    if (name === "sources") return renderSourcesBlock(ctx, node);
    if (name === "source") {
      const entry = sourceEntryFromDirective(node.propsRaw, node.children);
      if (entry) ctx.sourcesByKey.set(entry.key, entry);
      return "";
    }
    return `<section data-cmk-directive="${escapeHtml(node.name)}" data-cmk-props="${escapeHtml(node.propsRaw)}">${renderNodes(ctx, node.children)}</section>`;
  }
  if (node.type === "voidDirective") {
    const name = node.name.toLowerCase();
    if (name === "bibliography" || name === "sources") {
      if (ctx.sourcesEmitted) return "";
      return renderSourcesSection(ctx, "Sources", null);
    }
    return `<div data-cmk-void-directive="${escapeHtml(node.name)}" data-cmk-props="${escapeHtml(node.propsRaw)}"></div>`;
  }
  return `<div data-cmk-unknown="${escapeHtml(node.sourceKind)}"></div>`;
}

function renderNodes(ctx: RenderContext, nodes: RenderNode[]): string {
  return nodes.map((n) => renderNode(ctx, n)).join("");
}

export function renderIRToHtml(document: RenderIRDocument): string {
  const entries = collectSourceEntries(document.nodes);
  const sourcesByKey = new Map(entries.map((e) => [e.key, e]));
  const ctx: RenderContext = {
    sourcesByKey,
    citationOrder: [],
    citationIndex: new Map(),
    sourcesEmitted: false,
    missingKeys: new Set()
  };

  const frontmatter = document.frontmatterRaw
    ? `<pre class="cmk-frontmatter"><code>${escapeHtml(document.frontmatterRaw)}</code></pre>`
    : "";
  const body = renderNodes(ctx, document.nodes);
  for (const key of ctx.missingKeys) {
    console.warn(`[cmk-renderer] Missing literary source key: ${key}`);
  }
  return `<article class="cmk-render">${frontmatter}${body}</article>`;
}
