//sanity/structure.ts

import { HomeIcon, MasterDetailIcon, StarIcon } from "@sanity/icons";
import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Posts
      S.documentTypeListItem("post").title("Posts"),

      // Categories
      S.documentTypeListItem("category").title("Categories"),

      // Featured posts
      S.listItem()
        .title("Featured posts")
        .icon(StarIcon)
        .child(
          S.documentList()
            .title("Featured posts")
            .schemaType("post")
            .filter('_type == "post" && featured == true')
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),

      S.divider(),

      // Properties
      S.documentTypeListItem("property").title("Properties").icon(HomeIcon),

      // Locations / Areas
      S.documentTypeListItem("location").title("Locations / Areas").icon(MasterDetailIcon),

      S.divider(),

      // Keep access to future schemas (excluding already-listed types)
      ...S.documentTypeListItems().filter(
        (item) => !["post", "category", "property", "location", "propertyType", "lifestyle", "amenity"].includes(item.getId() ?? "")
      ),
    ]);
