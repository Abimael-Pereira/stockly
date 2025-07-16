"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upserProductActionSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-action";

export const upsertProduct = actionClient
  .schema(upserProductActionSchema)
  .action(async ({ parsedInput: { id, userId, ...data } }) => {
    await db.product.upsert({
      where: { id: id ?? "" },
      update: data,
      create: {...data, userId},
    });
    revalidatePath("/products");
    revalidatePath("/");
  });
