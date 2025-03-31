"use server";

import { put } from "@vercel/blob";

export async function uploadImage(file: File, data: { name: string }) {
  const blob = await put(`companies/${data.name}`, file, {
    access: "public",
  });

  return blob.url;
}
