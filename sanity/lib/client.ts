import { createClient, groq } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

export interface Lesson {
  title: string;
  image: string;
  slug: string;
  description: string;
  rating: number;
  outreach: number;
}

export async function getLessons(): Promise<Lesson[]> {
  return await client.fetch(
    groq`*[_type == "lesson"] | order(title asc) {
    title,
    "slug" : slug.current,
    description,
    "image" : image.asset -> url,
    rating,
    outreach
    }`
  );
}

export interface LessonSlide {
  title: string;
  slides: Slide[];
  hangman: {
    title: string;
    word: string;
    hint: string;
  };
  memory: {
    title: string;
    relevantCards: string[];
    irrelevantCards: string[];
  };
}
export interface Slide {
  title: string;
  content: string;
  image: string;
}
export async function getSlides(slug: string): Promise<LessonSlide> {
  return client.fetch(
    groq`*[_type == "lesson" && slug.current == $slug ][0]{
      title,
      "slides" : slides[]{
      title,
      content,
      "image": image.asset->url
      },
      hangman,
      memory
  }`,
    { slug }
  );
}

export interface Hangman {
  word: string;
  hint: string;
}
export async function getHangman(slug: string): Promise<Hangman> {
  return await client.fetch(
    groq`*[_type == "lesson" && slug.current == $slug ][0]  {
      "word": hangman.word,
      "hint": hangman.hint
  }`,
    { slug }
  );
}

export interface Memory {
  relevantCards: string[];
  irrelevantCards: string[];
}
export async function getMemmo(slug: string): Promise<Memory> {
  return await client.fetch(
    groq`*[_type == "lesson" && slug.current == $slug ][0]  {

      "relevantCards" : memory.relevantCards,
       "irrelevantCards": memory.irrelevantCards

   }`,
    { slug }
  );
}
