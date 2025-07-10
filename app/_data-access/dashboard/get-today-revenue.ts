import 'server-only';

import { db } from '@/app/_lib/prisma';
import { Prisma } from '@prisma/client';

export const getTodayRevenue = async (): Promise<number> => {
  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
  const todayRevenueQuery = Prisma.sql`
    SELECT SUM ("unitPrice" * "quantity") as "todayRevenue"
    FROM "SaleProduct"
    JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
    WHERE "Sale"."date" >= ${startOfDay} AND "Sale"."date" <= ${endOfDay};
  `;
  const todayRevenue =
    await db.$queryRaw<{ todayRevenue: number }[]>(todayRevenueQuery);
  return todayRevenue[0].todayRevenue;
};
