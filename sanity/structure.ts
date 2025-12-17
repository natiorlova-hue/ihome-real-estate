//sanity/structure.ts

import { StarIcon } from "@sanity/icons";
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

      // Keep access to future schemas
      ...S.documentTypeListItems().filter(
        (item) => !["post", "category"].includes(item.getId() ?? "")
      ),
    ]);
