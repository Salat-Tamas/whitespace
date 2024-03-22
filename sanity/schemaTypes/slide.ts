import { defineField, defineType } from "sanity";

export const slide = defineType({
  name: "slide",
  title: "Slide",
  type: "object",
  fields: [
    defineField({
      name: "title",
      description: "Title for the current slide",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),

    defineField({
      name: "content",
      title: "Content",
      description: "The content of the slide",
      type: "markdown",
      validation: (Rule) => Rule.required().max(270),
    }),
  ],
});
