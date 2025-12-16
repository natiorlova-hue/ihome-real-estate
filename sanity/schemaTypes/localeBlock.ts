//sanity/schemaTypes/localeBlock.ts

import { defineType } from 'sanity'

const languages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'es', title: 'Spanish' },
  { id: 'ru', title: 'Russian' },
]

export const localeBlock = defineType({
  name: 'localeBlock',
  title: 'Localized Rich Text',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: languages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'Quote', value: 'blockquote' },
        ],
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Number', value: 'number' },
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Code', value: 'code' },
          ],
          annotations: [
            {
              title: 'URL',
              name: 'link',
              type: 'object',
              fields: [
                {
                  title: 'URL',
                  name: 'href',
                  type: 'url',
                },
              ],
            },
          ],
        },
      },
      {
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
          },
          {
            name: 'caption',
            type: 'string',
            title: 'Caption',
          },
        ],
      },
    ],
    fieldset: lang.isDefault ? undefined : 'translations',
    validation: (Rule) => lang.isDefault ? Rule.required() : Rule.optional(),
  })),
  preview: {
    select: {
      enContent: 'en.0.children.0.text',
      esContent: 'es.0.children.0.text',
    },
    prepare(selection) {
      const { enContent, esContent } = selection
      return {
        title: enContent || 'No content',
        subtitle: esContent ? `Spanish: ${esContent}` : 'No Spanish translation',
      }
    }
  }
})
