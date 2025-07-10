import 'server-only';

import { db } from '@/app/_lib/prisma';
import { ProductStatusDto } from '../product/get-products';
import { Prisma } from '@prisma/client';

export interface MostSoldProductDto {
  id: string;
  name: string;
  totalSold: number;
  status: ProductStatusDto;
  price: number;
}

export const getMostSoldProducts = async () => {
  const mostSoldProductQuery = Prisma.sql`
    SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock", "Product"."id"
    FROM "SaleProduct"
    JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
    GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
    ORDER BY "totalSold" DESC
    LIMIT 5;
  `;
  const mostSoldProductsPromisse = db.$queryRaw<
    {
      id: string;
      name: string;
      totalSold: number;
      price: number;
      stock: number;
    }[]
  >(mostSoldProductQuery);
  const [mostSoldProducts] = await Promise.all([mostSoldProductsPromisse]);

  return {
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      totalSold: Number(product.totalSold),
      price: Number(product.price),
      status: (product.stock > 0
        ? 'IN-STOCK'
        : 'OUT-OF-STOCK') as ProductStatusDto,
    })),
  };
};
