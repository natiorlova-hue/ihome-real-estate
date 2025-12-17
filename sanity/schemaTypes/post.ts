import type { PreviewValue } from "sanity";
import { defineType } from "sanity";
import { I18nStringItem } from "./_types";

type PostDocument = {
  title?: I18nStringItem[];
};

const LOCALE_EN = "en" as const;

function getI18nValue(items: I18nStringItem[] | undefined, locale = LOCALE_EN) {
  return items?.find(i => i._key === locale)?.value ?? items?.[0]?.value ?? "";
}

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
      description: "Required. Used as the on-page H1 when SEO Meta title is empty.",
      validation: Rule => Rule.required(),
    },

    {
      name: "image",
      title: "Featured Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          type: "string",
          description:
            "Recommended for accessibility and SEO. Keep it short and descriptive.",
          validation: Rule =>
            Rule.max(120).warning("Keep alt text under 120 characters."),
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional. Displayed under the image in the article.",
          validation: Rule =>
            Rule.max(180).warning("Keep captions under 180 characters."),
        },
      ],
      validation: Rule => Rule.required(),
    },

    {
      name: "description",
      title: "Description",
      type: "internationalizedArrayText",
      group: "content",
      description:
        "Required. Used on listing cards and as fallback for Meta description.",
      validation: Rule =>
        Rule.required()
          .max(200)
          .warning("Ideal is 120–160 characters. 200 is the hard limit."),
    },

    {
      name: "content",
      title: "Rich Content",
      type: "localeBlock",
      group: "content",
      description:
        "Main article body. Use H2/H3 for headings. Avoid H1 inside the body.",
      validation: Rule => Rule.required(),
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: (doc: PostDocument) =>
          getI18nValue(doc.title, LOCALE_EN),
        maxLength: 96,
      },
      description:
        "Required. Used in the URL. Keep it stable after publishing.",
      validation: Rule => Rule.required(),
    },

    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      description:
        "Used for ordering and displayed date. Set to the publish date/time.",
    },

    {
      name: "categories",
      title: "Categories",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: { type: "category" } }],
      description: "Required. At least one category helps navigation and SEO.",
      validation: Rule => Rule.required().min(1),
    },

    {
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      group: "content",
      initialValue: false,
      description: "If enabled, it appears in the Featured posts view.",
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
          description:
            "Recommended. 50–60 chars. If empty, Title is used as fallback.",
          validation: Rule =>
            Rule.custom(value => {
              if (!Array.isArray(value) || value.length === 0) return true;

              const tooLong = value.some((i: { value?: unknown }) => {
                const v = typeof i?.value === "string" ? i.value.trim() : "";
                return v.length > 60;
              });

              return tooLong
                ? "Meta title is ideally ≤ 60 characters."
                : true;
            }).warning(),
        },

        {
          name: "metaDescription",
          title: "Meta description",
          type: "internationalizedArrayText",
          description:
            "Recommended. 120–160 chars. If empty, Description is used as fallback.",
          validation: Rule =>
            Rule.custom(value => {
              if (!Array.isArray(value) || value.length === 0) return true;

              const tooLong = value.some((i: { value?: unknown }) => {
                const v = typeof i?.value === "string" ? i.value.trim() : "";
                return v.length > 160;
              });

              return tooLong
                ? "Meta description is ideally ≤ 160 characters."
                : true;
            }).warning(),
        },

        {
          name: "ogImage",
          title: "OG image",
          type: "image",
          options: { hotspot: true },
          description:
            "Optional. Used for social previews. If empty, Featured Image can be used as fallback.",
          fields: [
            {
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: Rule =>
                Rule.max(120).warning("Keep alt text under 120 characters."),
            },
          ],
        },

        {
          name: "canonical",
          title: "Canonical URL",
          type: "url",
          description:
            "Optional. Only set when canonical differs from the default blog URL.",
          validation: Rule =>
            Rule.uri({ scheme: ["http", "https"] }).warning(
              "Use an absolute URL starting with http/https."
            ),
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

      const title = getI18nValue(titleArray, LOCALE_EN) || "Untitled";
      const subtitle =
        getI18nValue(descriptionArray, LOCALE_EN) || "No description";

      return { title, subtitle, media };
    },
  },
});
