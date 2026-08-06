import { createRenderEffect, type JSX } from "solid-js";
import {
  astJsonToRenderIR,
  renderIRToHtml,
  type CmkAstDocument
} from "@centrmark/cmk-renderer";

export type CmkHtmlProps = {
  html: string;
  class?: string;
};

/** Inject pre-rendered CentrMark HTML. Prefer host `set:html` / SSR when possible; this helper is browser-oriented. */
export function CmkHtml(props: CmkHtmlProps): JSX.Element {
  if (typeof document === "undefined") {
    // SSR fallback: opaque marker; hosts should prefer passing `html` through framework SSR APIs.
    return `<!-- cmk:${props.html.length} -->` as unknown as JSX.Element;
  }
  const el = document.createElement("div");
  createRenderEffect(() => {
    el.className = props.class ?? "cmk-root";
    el.innerHTML = props.html;
  });
  return el as unknown as JSX.Element;
}

export type CmkProps = {
  ast?: CmkAstDocument;
  html?: string;
  class?: string;
};

/** Render CentrMark from AST or HTML. Parse raw `.cmk` on the server via `@centrmark/parse`. */
export function Cmk(props: CmkProps): JSX.Element | null {
  const html =
    props.html ?? (props.ast ? renderIRToHtml(astJsonToRenderIR(props.ast)) : "");
  if (!html) return null;
  return CmkHtml({ html, class: props.class });
}
