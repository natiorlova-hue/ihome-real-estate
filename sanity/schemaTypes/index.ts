// sanity/schemaTypes/index.ts

import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { category } from './category'
import { localeBlock } from './localeBlock'
import { property } from './property'
import { location } from './location'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, category, localeBlock, property, location],
}
