import { createClient, groq } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

export async function getLessons() {
  return client.fetch(
    groq`*[_type == "lesson"] | order(title asc) {
    title,
    slug,
    description,
    rating,
    outreach,
    slides
    }`
  );
}
