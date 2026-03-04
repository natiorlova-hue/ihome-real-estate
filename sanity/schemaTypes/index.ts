//sanity/schemaTypes/index.ts

import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { category } from './category'
import { localeBlock } from './localeBlock'
import { property } from './property'
import { locationTaxonomy, propertyTypeTaxonomy, lifestyleTaxonomy, amenityTaxonomy } from './propertyTaxonomies'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, category, localeBlock, property, locationTaxonomy, propertyTypeTaxonomy, lifestyleTaxonomy, amenityTaxonomy],
}
