import { defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
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
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
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
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'content',
      title: 'Rich Content',
      type: 'localeBlock',
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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'category' },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      titleArray: 'title',
      descriptionArray: 'description',
      media: 'image',
    },
    prepare(selection) {
      const { titleArray, descriptionArray, media } = selection
      
      // Extract English title from the internationalized array
      const englishTitle = titleArray?.find((item: { _key: string; value: string }) => item._key === 'en')?.value || 'Untitled'
      
      // Extract English description from the internationalized array
      const englishDescription = descriptionArray?.find((item: { _key: string; value: string }) => item._key === 'en')?.value || 'No description'
      
      return {
        title: englishTitle,
        subtitle: englishDescription,
        media: media,
      }
    }
  },
})
