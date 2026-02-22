// sanity/schemaTypes/localeBlock.ts

import { defineType } from 'sanity';

const languages = [
  { id: "en", title: "English", isDefault: true },
  { id: "es", title: "Spanish" },
  { id: "ru", title: "Russian" },
];

export const localeBlock = defineType({
  name: "localeBlock",
  title: "Localized Rich Text",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: languages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: "array",
    of: [
      {
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          // IMPORTANT: No H1 inside article body to keep one H1 per page.
          { title: "H2", value: "h2" },
          { title: "H3", value: "h3" },
          { title: "Quote", value: "blockquote" },
        ],
        lists: [
          { title: "Bullet", value: "bullet" },
          { title: "Number", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
            { title: "Code", value: "code" },
          ],
          annotations: [
            {
              title: "URL",
              name: "link",
              type: "object",
              fields: [
                {
                  title: "URL",
                  name: "href",
                  type: "url",
                  validation: Rule =>
                    Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }).warning(
                      "Use a valid URL (http/https) or mailto/tel."
                    ),
                },
              ],
            },
          ],
        },
      },
      {
        type: "image",
        options: { hotspot: true },
        fields: [
          {
            name: "alt",
            type: "string",
            title: "Alternative text",
            description: "Recommended for accessibility.",
            validation: Rule =>
              Rule.max(120).warning("Keep alt text under 120 characters."),
          },
          {
            name: "caption",
            type: "string",
            title: "Caption",
            description: "Optional. Short caption under the image.",
            validation: Rule =>
              Rule.max(180).warning("Keep captions under 180 characters."),
          },
        ],
      },
      // Додаємо новий тип callout сюди
      {
        type: "object",
        name: "callout",
        title: "Highlight Block (Callout)",
        fields: [
          {
            name: "title",
            type: "string",
            title: "Title",
            description: "Optional heading for the highlighted block",
          },
          {
            name: "text",
            type: "text", // Використовуємо 'text' для багаторядкового поля
            title: "Content",
            validation: Rule => Rule.required(),
          },
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'text'
          },
          prepare(selection) {
            return {
              title: selection.title || 'Highlight Block',
              subtitle: selection.subtitle
            }
          }
        }
      }
    ],
    fieldset: lang.isDefault ? undefined : "translations",
    validation: Rule => (lang.isDefault ? Rule.required() : Rule.optional()),
  })),
  preview: {
    select: {
      enContent: "en.0.children.0.text",
      esContent: "es.0.children.0.text",
    },
    prepare(selection) {
      const { enContent, esContent } = selection as {
        enContent?: string;
        esContent?: string;
      };
      return {
        title: enContent || "No content",
        subtitle: esContent ? `Spanish: ${esContent}` : "No Spanish translation",
      };
    },
  },
});
