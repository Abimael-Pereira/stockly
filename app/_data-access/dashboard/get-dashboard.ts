import "server-only";

import { db } from "@/app/_lib/prisma";
import dayJs from "dayjs";

export interface DayReveneu {
  day: string;
  totalReveneu: number;
}

interface DashboardDto {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
  totalLast14DaysReveneu: DayReveneu[];
}

export const getDashboard = async (): Promise<DashboardDto> => {
  const today = dayJs().endOf("day").toDate();
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((day) =>
    dayJs(today).subtract(day, "day"),
  );
  const totalLast14DaysReveneu: DayReveneu[] = [];
  for (const day of last14Days) {
    const dayTotalReveneu = await db.$queryRawUnsafe<
      { totalReveneu: number }[]
    >(
      `
      SELECT SUM ("unitPrice" * "quantity") as "totalReveneu"
      FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2;
      `,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );
    totalLast14DaysReveneu.push({
      day: day.format("DD/MM"),
      totalReveneu: dayTotalReveneu[0].totalReveneu,
    });
  }
  const totalRevenueQuery = `
  SELECT SUM ("unitPrice" * "quantity") as "totalRevenue"
  FROM "SaleProduct"
  JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
  `;
  const todayRevenueQuery = `
    SELECT SUM ("unitPrice" * "quantity") as "todayRevenue"
    FROM "SaleProduct"
    JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
    WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2;
  `;
  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
  const totalRevenuePromisse =
    db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery);
  const todayRevenuePromisse = db.$queryRawUnsafe<{ todayRevenue: number }[]>(
    todayRevenueQuery,
    startOfDay,
    endOfDay,
  );
  const totalSalesPromisse = db.sale.count();
  const totalStockPromisse = db.product.aggregate({
    _sum: {
      stock: true,
    },
  });
  const totalProductsPromisse = db.product.count();
  const [totalRevenue, todayRevenue, totalSales, totalStock, totalProducts] =
    await Promise.all([
      totalRevenuePromisse,
      todayRevenuePromisse,
      totalSalesPromisse,
      totalStockPromisse,
      totalProductsPromisse,
    ]);

  return {
    totalRevenue: totalRevenue[0].totalRevenue,
    todayRevenue: todayRevenue[0].todayRevenue,
    totalSales,
    totalStock: Number(totalStock._sum.stock),
    totalProducts,
    totalLast14DaysReveneu,
  };
};
