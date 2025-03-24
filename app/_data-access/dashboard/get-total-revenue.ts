import "server-only"

import { db } from "@/app/_lib/prisma";

export const getTotalReveneu = async (): Promise<number> => {
  const totalRevenueQuery = `
  SELECT SUM ("unitPrice" * "quantity") as "totalRevenue"
  FROM "SaleProduct"
  JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
  `;

  const totalRevenue =
    await db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery);

  return totalRevenue[0].totalRevenue;
};
