import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { Users } from "@/payload/collections/Users";
import { Media } from "@/payload/collections/Media";

import { Header } from "@/payload/globals/header";
import { Home } from "@/payload/globals/home";
import { Footer } from "@/payload/globals/footer";
import { ContactUs } from "@/payload/globals/contact-us";

import { it } from "@payloadcms/translations/languages/it";

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
    livePreview: {
      globals: ["home", "header", "footer", "contact-us"],
      breakpoints: [
        {
          name: "desktop",
          label: "Desktop",
          width: 1920,
          height: 1080,
        },
        {
          name: "laptop",
          label: "Laptop",
          width: 1366,
          height: 768,
        },
        {
          name: "mobile",
          label: "Mobile",
          width: 375,
          height: 1080,
        },
      ],
      url: ({ globalConfig, locale }) => {
        const targetPath = `/${locale.code}/${globalConfig?.slug === "home" ? "" : globalConfig?.slug}`;
        return `/api/preview?url=${encodeURIComponent(targetPath)}&secret=${process.env.PAYLOAD_SECRET}`;
      },
    },
  },
  collections: [Users, Media],
  globals: [Header, Home, Footer, ContactUs],

  secret: process.env.PAYLOAD_SECRET,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
  }),

  localization: {
    locales: [
      { label: "Italiano", code: "it" },
      { label: "English", code: "en" },
      { label: "فارسی", code: "fa", rtl: true },
    ],
    defaultLocale: "it",
    fallback: true,
  },
  i18n: {
    fallbackLanguage: "it",
    supportedLanguages: { it },
    translations: {
      it: {
        general: {
          collections: "Database",
          globals: "Elementi",
        },
      },
    },
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
