import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";

/** Starlight の docs コレクション定義です。 */
const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

/** Astro Content Collections の一覧です。 */
export const collections = { docs };
