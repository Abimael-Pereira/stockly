import "server-only";

import { db } from "@/app/_lib/prisma";

export const getTotalProducts = async (
  userId: string | undefined,
): Promise<number> => {
  if (!userId) {
    return 0;
  }

  return await db.product.count({
    where: {
      userId,
    },
  });
};
