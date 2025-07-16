import "server-only";

import { db } from "@/app/_lib/prisma";
import dayJs from "dayjs";
import { Prisma } from "@prisma/client";

export interface DayReveneuDto {
  day: string;
  totalReveneu: number;
}

export const getTotalLast14DaysReveneu = async (userId: string | undefined) => {
  if (!userId) {
    return [];
  }

  const today = dayJs().endOf("day").toDate();
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((day) =>
    dayJs(today).subtract(day, "day"),
  );
  const totalLast14DaysReveneu: DayReveneuDto[] = [];
  for (const day of last14Days) {
    const dayTotalReveneu = await db.$queryRaw<{ totalReveneu: number }[]>(
      Prisma.sql`
    SELECT SUM ("unitPrice" * "quantity") as "totalReveneu"
    FROM "SaleProduct"
    JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
    WHERE "Sale"."date" >= ${day.startOf("day").toDate()}
     AND "Sale"."date" <= ${day.endOf("day").toDate()}
     AND "Sale"."userId" = ${userId};
  `,
    );

    totalLast14DaysReveneu.push({
      day: day.format("DD/MM"),
      totalReveneu: dayTotalReveneu[0].totalReveneu,
    });
  }

  return totalLast14DaysReveneu;
};
