import { defineField, defineType } from "sanity";

export const wordle = defineType({
  name: "wordle",
  title: "Wordle Game",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      title: "Word to guess",
      name: "word",
      type: "string",
    }),
  ],
});
