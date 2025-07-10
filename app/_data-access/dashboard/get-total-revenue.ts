import "server-only"

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const getTotalReveneu = async (): Promise<number> => {
  const totalRevenueQuery = Prisma.sql`
  SELECT SUM ("unitPrice" * "quantity") as "totalRevenue"
  FROM "SaleProduct"
  JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
  `;

  const totalRevenue =
    await db.$queryRaw<{ totalRevenue: number }[]>(totalRevenueQuery);

  return totalRevenue[0].totalRevenue;
};
