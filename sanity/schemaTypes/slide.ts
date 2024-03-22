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
      type: "text",
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "The image for the slide",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
      ],
    }),
  ],
});
