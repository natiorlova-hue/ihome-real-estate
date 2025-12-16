import type { PreviewValue } from "sanity";
import { defineType } from "sanity";
import { I18nStringItem } from "./_types";

type PostDocument = {
  title?: I18nStringItem[];
};

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],

  fields: [
    {
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      group: "content",
      validation: Rule => Rule.required(),
    },

    {
      name: "image",
      title: "Featured Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },

    {
      name: "description",
      title: "Description",
      type: "internationalizedArrayText",
      group: "content",
      validation: Rule => Rule.required().max(200),
    },

    {
      name: "content",
      title: "Rich Content",
      type: "localeBlock",
      group: "content",
      validation: Rule => Rule.required(),
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
    source: (doc: PostDocument) =>
      doc.title?.find(item => item._key === "en")?.value,
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },

    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
    },

    {
      name: "categories",
      title: "Categories",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: Rule => Rule.required().min(1),
    },

    {
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      group: "content",
      initialValue: false,
    },

    // SEO
    {
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "metaTitle",
          title: "Meta title",
          type: "internationalizedArrayString",
        },
        {
          name: "metaDescription",
          title: "Meta description",
          type: "internationalizedArrayText",
        },
        {
          name: "ogImage",
          title: "OG image",
          type: "image",
          options: { hotspot: true },
        },
        {
          name: "canonical",
          title: "Canonical URL",
          type: "url",
        },
      ],
    },
  ],

preview: {
  select: {
    titleArray: "title",
    descriptionArray: "description",
    media: "image",
  },
  prepare(selection: {
    titleArray?: I18nStringItem[];
    descriptionArray?: I18nStringItem[];
    media?: PreviewValue["media"];
  }): PreviewValue {
    const { titleArray, descriptionArray, media } = selection;

    const title =
      titleArray?.find(item => item._key === "en")?.value ?? "Untitled";

    const subtitle =
      descriptionArray?.find(item => item._key === "en")?.value ??
      "No description";

    return {
      title,
      subtitle,
      media,
    };
  },
},

});
