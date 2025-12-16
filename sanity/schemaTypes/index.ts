//sanity/schemaTypes/index.ts

import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { category } from './category'
import { localeBlock } from './localeBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, category, localeBlock],
}
