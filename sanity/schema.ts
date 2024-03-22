import { type SchemaTypeDefinition } from "sanity";
import { slide } from "./schemaTypes/slide";
import { lesson } from "./schemaTypes/lesson";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [slide, lesson],
};
