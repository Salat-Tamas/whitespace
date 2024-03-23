import { defineField, defineType } from "sanity";
import { slide } from "./slide";
import { hangMan } from "./hangMan";

export const lesson = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "slug",
      description: "Hit generate to create slug from the title",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        // maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      description: "A short description of the lesson",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().max(70),
    }),

    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [{ type: "slide" }],
    }),

    // TODO: Add a game field
    defineField({
      name: "hangman",
      title: "Game Hangman",
      type: "hangman",
    }),
    defineField({
      name: "memory",
      title: "Game Memory Card",
      type: "memory",
    }),
    defineField({
      name: "wordle",
      title: "Game Wordle",
      type: "wordle",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      readOnly: true,
    }),

    defineField({
      name: "outreach",
      title: "Outreach",
      type: "number",
      readOnly: true,
    }),
  ],
});
