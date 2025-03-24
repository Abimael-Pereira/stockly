import "server-only"

import { db } from "@/app/_lib/prisma";
import dayJs from "dayjs";

export interface DayReveneu {
  day: string;
  totalReveneu: number;
}

export const getTotalLast14DaysReveneu = async () => {
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

  return totalLast14DaysReveneu;
};
