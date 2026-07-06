"use server";

import { rm } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteProperty(propertyId: string) {
  await prisma.property.delete({ where: { id: propertyId } });

  const dir = path.join(process.cwd(), "public", "documents", propertyId);
  await rm(dir, { recursive: true, force: true }).catch(() => {});

  revalidatePath("/library");
  revalidatePath("/compare");
}
