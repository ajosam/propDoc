"use server";

import { extractPropertyFromPdf, type GeminiExtractionResult } from "@/lib/gemini-extract";

const MAX_FILE_BYTES = 15 * 1024 * 1024; // keep well under Gemini's inline-data request limit

export async function extractPropertyAction(formData: FormData): Promise<GeminiExtractionResult> {
  const file = formData.get("file");
  if (!(file instanceof File)) throw new Error("No file provided.");
  if (file.type !== "application/pdf") throw new Error("Only PDF files are supported.");
  if (file.size > MAX_FILE_BYTES) throw new Error("File is too large — please upload a PDF under 15MB.");

  const arrayBuffer = await file.arrayBuffer();
  const base64Data = Buffer.from(arrayBuffer).toString("base64");

  return extractPropertyFromPdf(base64Data, file.type);
}
