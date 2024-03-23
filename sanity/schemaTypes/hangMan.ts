import { defineField, defineType } from "sanity";

export const hangMan = defineType({
  name: "hangman",
  title: "Hangman Game",
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
