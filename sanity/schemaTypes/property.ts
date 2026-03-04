// sanity/schemaTypes/property.ts

import { defineType, SanityDocument } from "sanity";
import { I18nStringItem } from "./_types";
export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "details", title: "Details & Specs" },
    { name: "taxonomies", title: "Taxonomies" },
  ],
  fields: [
    // General
    {
      name: "propertyId",
      title: "Property ID",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      group: "general",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "general",
      options: {
        source: (doc: SanityDocument) =>
          (doc.title as I18nStringItem[] | undefined)?.find((t) => t._key === "en")?.value,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      group: "general",
      options: {
        list: [
          { title: "Resale", value: "resale" },
          { title: "New Development", value: "new_development" },
          { title: "For Rent", value: "for_rent" },
          { title: "Sold", value: "sold" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price (€)",
      type: "number",
      group: "general",
      description: "Leave empty if Price on Request",
    },
    {
      name: "priceOnRequest",
      title: "Price on Request",
      type: "boolean",
      group: "general",
      initialValue: false,
    },

    // Details & Specs
    { name: "bedrooms", title: "Bedrooms", type: "number", group: "details" },
    { name: "bathrooms", title: "Bathrooms", type: "number", group: "details" },
    { name: "totalArea", title: "Total Area (m²)", type: "number", group: "details" },
    { name: "livingArea", title: "Living Area (m²)", type: "number", group: "details" },
    { name: "plotArea", title: "Plot Area (m²)", type: "number", group: "details" },

    // Taxonomies (Filters)
    {
      name: "propertyType",
      title: "Property Type",
      type: "reference",
      to: [{ type: "propertyType" }],
      group: "taxonomies",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Location / Area",
      type: "reference",
      to: [{ type: "location" }],
      group: "taxonomies",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lifestyles",
      title: "Lifestyles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "lifestyle" }] }],
      group: "taxonomies",
    },
    {
      name: "amenities",
      title: "Amenities / Features",
      type: "array",
      of: [{ type: "reference", to: [{ type: "amenity" }] }],
      group: "taxonomies",
    },
  ],
  preview: {
    select: {
      titleArray: "title",
      price: "price",
      status: "status",
    },
    prepare({ titleArray, price, status }) {
      const typedTitle = titleArray as I18nStringItem[] | undefined;
      const typedPrice = price as number | undefined;
      const typedStatus = status as string | undefined;
      const title = typedTitle?.find((t: I18nStringItem) => t._key === "en")?.value || "Untitled";
      return {
        title,
        subtitle: `${typedStatus ? typedStatus.toUpperCase() : "NO STATUS"} | €${typedPrice || "On Request"}`,
      };
    },
  },
});

// Схема мапить всі вимоги з вашого списку. Налаштовано референси на раніше створені таксономії для повної цілісності даних.
