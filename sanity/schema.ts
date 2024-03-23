import { type SchemaTypeDefinition } from "sanity";
import { slide } from "./schemaTypes/slide";
import { lesson } from "./schemaTypes/lesson";
import { wordle } from "./schemaTypes/wordle";
import { memory } from "./schemaTypes/memory";
import { hangMan } from "./schemaTypes/hangMan";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [slide, lesson, wordle, memory, hangMan],
};
