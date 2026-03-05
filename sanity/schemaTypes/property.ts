// sanity/schemaTypes/property.ts

import { HomeIcon } from "lucide-react";
import type { PreviewValue, SanityDocument } from "sanity";
import { defineArrayMember, defineField, defineType } from "sanity";
import { I18nStringItem } from "./_types";

const LOCALE_EN = "en" as const;

function getEnValue(titleArray?: I18nStringItem[]) {
  return titleArray?.find((item) => item._key === LOCALE_EN)?.value || "Untitled Property";
}

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "general", title: "General Info", default: true },
    { name: "location", title: "Location" },
    { name: "specs", title: "Details & Specs" },
    { name: "features", title: "Features & Amenities" },
    { name: "media", title: "Media" },
  ],
  fields: [
    // ==========================================
    // 1. GENERAL INFO
    // ==========================================
    defineField({
      name: "propertyId",
      title: "Property ID (Артикул)",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "general",
options: {
  source: (doc: SanityDocument & { title?: I18nStringItem[] }) =>
    getEnValue(doc.title),
  maxLength: 96,
},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeBlock",
      group: "general",
    }),
    defineField({
      name: "status",
      title: "Status (Бейдж)",
      type: "string",
      group: "general",
      options: {
        list: [
          { title: "Resale (Вторинний ринок)", value: "resale" },
          { title: "New Development (Новобудова)", value: "new_development" },
          { title: "For Rent (Оренда)", value: "for_rent" },
          { title: "Sold (Продано)", value: "sold" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (€)",
      type: "number",
      group: "general",
      hidden: ({ document }) => document?.priceOnRequest === true,
    }),
    defineField({
      name: "priceOnRequest",
      title: "Price on Request",
      type: "boolean",
      group: "general",
      initialValue: false,
    }),
    defineField({
      name: "categories",
      title: "Category / Segment",
      type: "array" as const,
      group: "general",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Luxury", value: "luxury" },
          { title: "Premium", value: "premium" },
        ],
      },
    }),

    // ==========================================
    // 2. LOCATION & TYPE
    // ==========================================
    defineField({
      name: "location",
      title: "Location (Район)",
      type: "reference" as const,
      to: [{ type: "location" as const }],
      group: "location",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "urbanizacion",
      title: "Urbanizacion (Комплекс)",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "string",
      group: "location",
      options: {
        list: [
          { title: "Apartment", value: "apartment" },
          { title: "Penthouse", value: "penthouse" },
          { title: "Townhouse", value: "townhouse" },
          { title: "Semi-detached Villa", value: "semi-detached-villa" },
          { title: "Villa", value: "villa" },
          { title: "Commercial Property", value: "commercial-property" },
          { title: "Plot", value: "plot" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // ==========================================
    // 3. DETAILS & SPECS
    // ==========================================
    defineField({
      name: "condition",
      title: "Condition (Состояние)",
      type: "string",
      group: "specs",
      options: {
        list: [
          { title: "New (Новое)", value: "new" },
          { title: "Excellent (Отличное)", value: "excellent" },
          { title: "Needs Renovation (Требует ремонта)", value: "renovation" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "views",
      title: "Views (Вид)",
      type: "array" as const,
      group: "specs",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Sea View (Море)", value: "sea" },
          { title: "Mountain View (Горы)", value: "mountains" },
          { title: "Garden View (Сад)", value: "garden" },
          { title: "Golf Course View (Гольф)", value: "golf" },
          { title: "Panoramic View (Панорамный)", value: "panoramic" },
        ],
      },
    }),
    defineField({ name: "bedrooms", title: "Bedrooms", type: "number", group: "specs" }),
    defineField({ name: "bathrooms", title: "Bathrooms", type: "number", group: "specs" }),
    defineField({ name: "totalArea", title: "Total Area (m²)", type: "number", group: "specs" }),
    defineField({ name: "livingArea", title: "Living Area (m²)", type: "number", group: "specs" }),
    defineField({ name: "plotArea", title: "Plot Area (m²)", type: "number", group: "specs" }),
    defineField({ name: "terraceArea", title: "Terrace Area (m²)", type: "number", group: "specs" }),
    defineField({ name: "floor", title: "Floor / Storeys", type: "string", group: "specs" }),
    defineField({ name: "yearBuilt", title: "Year Built", type: "number", group: "specs" }),

    // ==========================================
    // 4. FEATURES & AMENITIES
    // ==========================================
    defineField({
      name: "features",
      title: "Property Features (Внутри объекта)",
      type: "array" as const,
      group: "features",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Terrace (Терраса)", value: "terrace" },
          { title: "Furnished (Мебель)", value: "furniture" },
          { title: "Walk-in Closet (Гардеробная)", value: "closet" },
          { title: "Storage Room", value: "storage" },
          { title: "Parking Space", value: "parking" },
          { title: "Smart Home System", value: "smart_home" },
          { title: "Air Conditioning", value: "ac" },
          { title: "Elevator (Лифт)", value: "elevator" },
        ],
      },
    }),
    defineField({
      name: "amenities",
      title: "Complex Amenities (Инфраструктура)",
      type: "array" as const,
      group: "features",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Swimming Pool", value: "pool" },
          { title: "Indoor Pool (Зимний)", value: "indoor_pool" },
          { title: "SPA", value: "spa" },
          { title: "Gym", value: "gym" },
          { title: "Padel Court", value: "padel" },
          { title: "Co-working", value: "coworking" },
          { title: "Residents' Lounge", value: "lounge" },
          { title: "BBQ Area", value: "bbq" },
          { title: "Playground", value: "playground" },
          { title: "Garden", value: "garden" },
          { title: "Security 24/7", value: "security" },
          { title: "Gated Community", value: "gated" },
          { title: "Concierge", value: "concierge" },
        ],
      },
    }),
    defineField({
      name: "lifestyles",
      title: "Lifestyles (Лайфстайл)",
      type: "array" as const,
      group: "features",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Families relocating", value: "families" },
          { title: "Golf & Slow Life", value: "golf" },
          { title: "Golden Years", value: "golden" },
          { title: "Home by the Sea", value: "sea" },
          { title: "Digital Nomads", value: "nomads" },
          { title: "Investment Seekers", value: "investment" },
        ],
      },
    }),

    // ==========================================
    // 5. MEDIA
    // ==========================================
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array" as const,
      group: "media",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      titleArray: "title",
      price: "price",
      status: "status",
      media: "images.0",
      id: "propertyId",
    },
    // В Sanity v4 сигнатура очікує Record ключів на unknown,
    // щоб ми могли безпечно кастувати їх до потрібних типів.
    prepare(selection: {
      titleArray?: unknown;
      price?: unknown;
      status?: unknown;
      media?: unknown;
      id?: unknown;
    }): PreviewValue {
      // Безпечне приведення типів (Type Casting) без використання any
      const titleArray = selection.titleArray as I18nStringItem[] | undefined;
      const price = selection.price as number | undefined;
      const status = selection.status as string | undefined;
      const media = selection.media as PreviewValue["media"];
      const id = selection.id as string | undefined;

      const title = getEnValue(titleArray);
      const statusFormatted = status ? status.replace("_", " ").toUpperCase() : "UNKNOWN";
      const priceText = price ? `€${price.toLocaleString()}` : "Price on Request";

      return {
        title: `${id || "NO ID"} | ${title}`,
        subtitle: `${statusFormatted} - ${priceText}`,
        media,
      };
    },
  },
});
