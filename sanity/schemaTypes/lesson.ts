import { defineField, defineType } from "sanity";
import { slide } from "./slide";

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
      description: "A short description of the slide",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().max(150),
    }),

    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [{ type: "slide" }],
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
