import { defineField, defineType } from "sanity";

export const memory = defineType({
  name: "memory",
  title: "Memory Game",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      title: "Cards",
      name: "cards",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
