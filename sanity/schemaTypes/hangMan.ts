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
      validation: (Rule) => Rule.required().max(25),
    }),
    defineField({
      name: "hint",
      description:
        "Hint for the word to guess aka 1  starting letter. MAX 1 letter",
      title: "Hint",
      type: "string",
      validation: (Rule) => Rule.max(1),
    }),
  ],
});
