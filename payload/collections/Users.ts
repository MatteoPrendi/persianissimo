import { CollectionConfig } from "payload";

const FIVE_MINUTES = 1000 * 60 * 5;
const FIFTEEN_DAYS = 60 * 60 * 24 * 15;

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: true,
    lockTime: FIVE_MINUTES,
    maxLoginAttempts: 5,
    tokenExpiration: FIFTEEN_DAYS,
  },
  admin: { useAsTitle: "name" },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
