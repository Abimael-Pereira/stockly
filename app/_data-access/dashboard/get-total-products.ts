import { db } from "@/app/_lib/prisma";

export const getTotalProducts = async () => {
  return await db.product.count();
};
