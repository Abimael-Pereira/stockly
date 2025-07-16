import "server-only";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const getTotalReveneu = async (
  userId: string | undefined,
): Promise<number> => {
  if (!userId) {
    return 0;
  }

  const totalRevenueQuery = Prisma.sql`
  SELECT SUM ("unitPrice" * "quantity") as "totalRevenue"
  FROM "SaleProduct"
  JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
  WHERE "Sale"."userId" = ${userId}
  `;

  const totalRevenue =
    await db.$queryRaw<{ totalRevenue: number }[]>(totalRevenueQuery);

  return totalRevenue[0].totalRevenue;
};
