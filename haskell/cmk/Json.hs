module CMK.Json
  ( toJsonCanonical
  ) where

import CMK.AST

-- | Canonical JSON serialization stub.
-- TODO: implement canonical JSON shape to match the D reference output.
toJsonCanonical :: AstDocument -> String
toJsonCanonical _ =
  "{\"TODO\":\"Haskell canonical JSON serializer not implemented yet.\"}"
