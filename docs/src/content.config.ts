import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { docsVersionsLoader } from "starlight-versions/loader";

/** Starlight の docs コレクション定義です。 */
const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

/** Starlight Versions の archived docs コレクション定義です。 */
const versions = defineCollection({
  loader: docsVersionsLoader(),
});

/** Astro Content Collections の一覧です。 */
export const collections = { docs, versions };
