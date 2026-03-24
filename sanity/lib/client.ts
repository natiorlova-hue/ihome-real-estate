//sanity/lib/client.ts

import { createClient } from "next-sanity";

// eslint-disable-next-line no-restricted-imports
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
