import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { en } from "@payloadcms/translations/languages/en";
import { it } from "@payloadcms/translations/languages/it";

import { Users } from "@/payload/collections/Users";
import { Media } from "@/payload/collections/Media";
import { Home } from "@/payload/globals/home";

if (!process.env.DATABASE_URL) {
  throw new Error("ERROR: DATABASE_URL not found.");
}
if (!process.env.PAYLOAD_SECRET) {
  throw new Error("ERROR: PAYLOAD_SECRET not found.");
}
if (!process.env.BLOB_TOKEN) {
  throw new Error("ERROR: BLOB_TOKEN not found.");
}

export default buildConfig({
  admin: {
    autoRefresh: true,
  },
  collections: [Users, Media],
  globals: [Home],

  secret: process.env.PAYLOAD_SECRET,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
  }),

  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Italiano", code: "it" },
      { label: "فارسی", code: "fa", rtl: true },
    ],
    defaultLocale: "it",
    fallback: true,
  },
  i18n: {
    fallbackLanguage: "it",
    supportedLanguages: { en, it },
  },

  plugins: [
    vercelBlobStorage({
      token: process.env.BLOB_TOKEN,
      enabled: true,
      collections: {
        media: {
          disableLocalStorage: true,
          generateFileURL: ({ filename }) => {
            return `${process.env.BLOB_URL}/${filename}`;
          },
        },
      },
    }),
  ],
});
