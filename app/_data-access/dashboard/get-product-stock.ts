import "server-only";

import { db } from "@/app/_lib/prisma";

export const getTotalStock = async (
  userId: string | undefined,
): Promise<number> => {
  if (!userId) {
    return 0;
  }
  const totalStock = await db.product.aggregate({
    _sum: {
      stock: true,
    },
    where: {
      userId,
    },
  });
  return Number(totalStock._sum.stock);
};
