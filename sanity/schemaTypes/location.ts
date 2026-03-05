// sanity/schemaTypes/location.ts

import { MapPinIcon } from "lucide-react";
import { defineType } from "sanity";
import { I18nStringItem } from "./_types";

const LOCALE_EN = "en" as const;

interface TaxonomyDoc {
  title?: I18nStringItem[];
}

function getEnValue(titleArray?: I18nStringItem[]) {
  return titleArray?.find((item) => item._key === LOCALE_EN)?.value || "Untitled";
}

export const location = defineType({
  name: "location",
  title: "Location / Area",
  type: "document",
  icon: MapPinIcon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: (doc: TaxonomyDoc) => getEnValue(doc.title), maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "parent",
      title: "Parent Region",
      description: "For sub-areas (e.g., Puerto Banús -> Parent: Marbella)",
      type: "reference",
      to: [{ type: "location" }],
    },
  ],
  preview: {
    select: { titleArray: "title", parentArray: "parent.title" },
    prepare({ titleArray, parentArray }: { titleArray?: I18nStringItem[]; parentArray?: I18nStringItem[] }) {
      const title = getEnValue(titleArray);
      const parent = parentArray ? getEnValue(parentArray) : "";
      return { title, subtitle: parent ? `Child of ${parent}` : "Main Region" };
    },
  },
});
