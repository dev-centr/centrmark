import type { CmkAstDocument } from "./types";

export interface CmkParserAdapter {
  parseToAstJson(cmkSource: string): Promise<CmkAstDocument>;
}

export class DFfiParserAdapter implements CmkParserAdapter {
  async parseToAstJson(_cmkSource: string): Promise<CmkAstDocument> {
    throw new Error(
      "DFfiParserAdapter is not wired yet. Provide a WASM/native bridge that calls cmk_parse_ref/cmk_parse_opt."
    );
  }
}

export class StaticAstParserAdapter implements CmkParserAdapter {
  constructor(private readonly resolver: (cmkSource: string) => Promise<CmkAstDocument>) {}

  parseToAstJson(cmkSource: string): Promise<CmkAstDocument> {
    return this.resolver(cmkSource);
  }
}

export async function parseAstFromJsonText(jsonText: string): Promise<CmkAstDocument> {
  const parsed = JSON.parse(jsonText) as CmkAstDocument;
  return parsed;
}
