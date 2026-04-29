module CMK.AST
  ( BlockKind(..)
  , InlineKind(..)
  , AstInlineNode(..)
  , AstBlock(..)
  , AstDocument(..)
  ) where

-- MVP AST: mirrors the D reference implementation's serialized shape.
-- Extend as the specification subset grows.

data BlockKind
  = Heading
  | Paragraph
  | CodeBlock
  | Blockquote
  | List
  | BlockDirective
  | VoidDirective
  deriving (Eq, Show)

data InlineKind
  = Text
  | Strong
  | Emphasis
  | CodeSpan
  | Link
  | SemanticLink
  | VariableRef
  | InlineDirective
  deriving (Eq, Show)

data AstInlineNode = AstInlineNode
  { inlineKind :: InlineKind
  , inlineText :: Maybe String
  , inlineUrl :: Maybe String
  , inlineVariableName :: Maybe String
  , inlineDirectiveName :: Maybe String
  , inlinePropsRaw :: Maybe String
  , inlineChildren :: [AstInlineNode]
  } deriving (Eq, Show)

data AstBlock = AstBlock
  { blockKind :: BlockKind
  , blockLevel :: Maybe Int
  , blockInlines :: [AstInlineNode]
  , blockCodeLanguage :: Maybe String
  , blockCode :: Maybe String
  , blockQuoteBlocks :: [AstBlock]
  , blockListItems :: [AstBlock] -- placeholder until list-item AST is refined
  , blockName :: Maybe String
  , blockPropsRaw :: Maybe String
  } deriving (Eq, Show)

data AstDocument = AstDocument
  { docHasFrontmatter :: Bool
  , docFrontmatterRaw :: Maybe String
  , docBlocks :: [AstBlock]
  } deriving (Eq, Show)
