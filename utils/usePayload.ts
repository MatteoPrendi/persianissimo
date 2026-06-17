"use server";
import config from "@payload-config";
import { getPayload } from "payload";

export async function usePayload() {
  return await getPayload({ config });
}
