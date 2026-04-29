module CMK.Parser
  ( parseCmk
  ) where

-- MVP parser stub.
--
-- Implement a real parser for the subset you support in the D reference
-- implementation. Once you can produce the same canonical AST JSON, you can
-- benchmark Haskell vs optimized D.

import CMK.AST

-- | Parse a CentrMark (CMK) document into the MVP AST.
-- TODO: implement parsing rules (frontmatter, headings, paragraphs, void
-- directives, and inline directives) consistent with the D reference subset.
parseCmk :: String -> Either String AstDocument
parseCmk _ =
  Left "Haskell CMK parser not implemented yet (MVP stub)."
