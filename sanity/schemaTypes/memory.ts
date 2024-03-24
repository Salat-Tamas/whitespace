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
      title: "Relevant Cards",
      name: "relevantCards",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      title: "Irrelevant Cards",
      name: "irrelevantCards",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().max(50),
    }),
  ],
});
