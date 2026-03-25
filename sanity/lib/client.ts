//sanity/lib/client.ts

import { createClient } from "next-sanity";

// eslint-disable-next-line no-restricted-imports
import { apiVersion, dataset, projectId } from "../env";

// Публічний client (для клієнтських компонентів, якщо потрібно)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

// Серверний client (для Server Components / API routes)
export const serverClient = client.withConfig({
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",
});
