import type { CSSProperties } from "react";
import {
  astJsonToRenderIR,
  renderIRToHtml,
  type CmkAstDocument
} from "@centrmark/cmk-renderer";

export type CmkHtmlProps = {
  html: string;
  className?: string;
  style?: CSSProperties;
};

/** Inject pre-rendered CentrMark HTML. */
export function CmkHtml(props: CmkHtmlProps) {
  return (
    <div
      className={props.className ?? "cmk-root"}
      style={props.style}
      dangerouslySetInnerHTML={{ __html: props.html }}
    />
  );
}

export type CmkProps = {
  ast?: CmkAstDocument;
  html?: string;
  className?: string;
  style?: CSSProperties;
};

/** Render CentrMark from AST or HTML. Parse raw `.cmk` on the server with `@centrmark/parse`. */
export function Cmk(props: CmkProps) {
  const html =
    props.html ??
    (props.ast ? renderIRToHtml(astJsonToRenderIR(props.ast)) : "");
  if (!html) return null;
  return <CmkHtml html={html} className={props.className} style={props.style} />;
}
