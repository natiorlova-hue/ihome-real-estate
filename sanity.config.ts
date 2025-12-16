//sanity.config.ts

/**
 * Sanity Studio configuration (mounted at /studio)
 */
import { defineConfig } from "sanity";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),

    // NOTE: Vision tool disabled to avoid Turbopack runtime ENOENT from jsdom/dompurify chain.
    internationalizedArray({
      languages: [
        { id: "en", title: "English" },
        { id: "es", title: "Spanish" },
        { id: "ru", title: "Russian" },
      ],
      defaultLanguages: ["en"],
      fieldTypes: ["string", "text"],
    }),
  ],
});
