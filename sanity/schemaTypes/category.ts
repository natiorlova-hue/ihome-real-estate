//sanity/schemaTypes/category.ts

import { defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      options: {
        languages: [
          { id: 'en', title: 'English' },
          { id: 'es', title: 'Spanish' },
          { id: 'ru', title: 'Russian' },
        ],
        defaultLanguages: ['en'],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayText',
      options: {
        languages: [
          { id: 'en', title: 'English' },
          { id: 'es', title: 'Spanish' },
          { id: 'ru', title: 'Russian' },
        ],
        defaultLanguages: ['en'],
      },
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Purple', value: 'purple' },
          { title: 'Orange', value: 'orange' },
          { title: 'Red', value: 'red' },
          { title: 'Pink', value: 'pink' },
          { title: 'Indigo', value: 'indigo' },
          { title: 'Yellow', value: 'yellow' },
        ],
      },
    },
  ],
  preview: {
    select: {
      titleArray: 'title',
      descriptionArray: 'description',
    },
    prepare(selection) {
      const { titleArray, descriptionArray } = selection

      // Extract English title from the internationalized array
      const englishTitle = titleArray?.find((item: { _key: string; value: string }) => item._key === 'en')?.value || 'Untitled Category'

      // Extract English description from the internationalized array
      const englishDescription = descriptionArray?.find((item: { _key: string; value: string }) => item._key === 'en')?.value || 'No description'

      return {
        title: englishTitle,
        subtitle: englishDescription,
      }
    }
  },
})
