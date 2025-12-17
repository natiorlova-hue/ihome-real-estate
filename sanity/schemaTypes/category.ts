//sanity/schemaTypes/category.ts

import type { PreviewValue } from 'sanity';
import { defineType } from 'sanity';
import { I18nStringItem } from './_types';

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      options: {
        languages: [
          { id: "en", title: "English" },
          { id: "es", title: "Spanish" },
          { id: "ru", title: "Russian" },
        ],
        defaultLanguages: ["en"],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: { title?: I18nStringItem[] }) =>
          doc.title?.find(item => item._key === "en")?.value,
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "internationalizedArrayText",
      options: {
        languages: [
          { id: "en", title: "English" },
          { id: "es", title: "Spanish" },
          { id: "ru", title: "Russian" },
        ],
        defaultLanguages: ["en"],
      },
    },
    {
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Green", value: "green" },
          { title: "Purple", value: "purple" },
          { title: "Orange", value: "orange" },
          { title: "Red", value: "red" },
          { title: "Pink", value: "pink" },
          { title: "Indigo", value: "indigo" },
          { title: "Yellow", value: "yellow" },
        ],
      },
    },
  ],
  preview: {
    select: {
      titleArray: "title",
      descriptionArray: "description",
    },
    prepare(selection: {
      titleArray?: I18nStringItem[];
      descriptionArray?: I18nStringItem[];
    }): PreviewValue {
      const { titleArray, descriptionArray } = selection;

      const title =
        titleArray?.find(item => item._key === "en")?.value ??
        "Untitled Category";

      const subtitle =
        descriptionArray?.find(item => item._key === "en")?.value ??
        "No description";

      return {
        title,
        subtitle,
      };
    },
  },
});
