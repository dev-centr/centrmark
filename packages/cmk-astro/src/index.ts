import type { AstroIntegration } from "astro";

export type CentrmarkAstroOptions = {
  /** Path to centrmark-cli (also honors CENTRMARK_CLI). */
  cliPath?: string;
};

/**
 * Astro integration for CentrMark SSG.
 */
export default function centrmark(options: CentrmarkAstroOptions = {}): AstroIntegration {
  return {
    name: "@centrmark/astro",
    hooks: {
      "astro:config:setup": ({ updateConfig, logger }) => {
        if (options.cliPath) {
          process.env.CENTRMARK_CLI = options.cliPath;
          logger.info(`Using CentrMark CLI at ${options.cliPath}`);
        }
        updateConfig({
          vite: {
            ssr: {
              noExternal: [
                "@centrmark/cmk-renderer",
                "@centrmark/parse",
                "@centrmark/astro"
              ]
            }
          }
        });
      }
    }
  };
}

export { centrmarkLoader, parseSdlFrontmatter } from "./loader.js";
export type { CentrmarkLoaderOptions } from "./loader.js";
