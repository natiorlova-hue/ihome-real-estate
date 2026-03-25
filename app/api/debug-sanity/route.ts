// app/api/debug-sanity/route.ts
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
  const token = process.env.SANITY_API_TOKEN;

  const results: Record<string, unknown> = {
    projectId,
    dataset,
  };

  // 1. Без токена, perspective published
  const publicClient = createClient({
    projectId,
    dataset,
    apiVersion: "2025-02-19",
    useCdn: false,
    perspective: "published",
  });

  // 2. З токеном, perspective raw (як Studio)
  const tokenClient = createClient({
    projectId,
    dataset,
    apiVersion: "2025-02-19",
    useCdn: false,
    token: token || undefined,
    perspective: "raw",
  });

  // A: public — count property
  try {
    results.publicCount = await publicClient.fetch(
      'count(*[_type == "property"])'
    );
  } catch (e: unknown) {
    results.publicCount = String(e);
  }

  // B: з токеном — count property
  try {
    results.tokenCount = await tokenClient.fetch(
      'count(*[_type == "property"])'
    );
  } catch (e: unknown) {
    results.tokenCount = String(e);
  }

  // C: з токеном — шукаємо drafts
  try {
    results.draftsCount = await tokenClient.fetch(
      'count(*[_id match "drafts.*" && _type == "property"])'
    );
  } catch (e: unknown) {
    results.draftsCount = String(e);
  }

  // D: з токеном — всі типи
  try {
    results.allTypes = await tokenClient.fetch("array::unique(*[]._type)");
  } catch (e: unknown) {
    results.allTypes = String(e);
  }

  // E: з токеном — перші 5 документів будь-якого типу (id + type)
  try {
    results.sampleDocs = await tokenClient.fetch("*[0..4]{_id, _type}");
  } catch (e: unknown) {
    results.sampleDocs = String(e);
  }
  // Додай це в debug route
  try {
    results.propertyIds = await tokenClient.fetch(
      '*[_type == "property"][0..4]{_id}'
    );
  } catch (e: unknown) {
    results.propertyIds = String(e);
  }
  // F: повний projectId для порівняння зі Studio
  results.fullProjectId = projectId;

  return NextResponse.json(results);
}
