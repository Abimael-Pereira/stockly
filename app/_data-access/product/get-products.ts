import "server-only";

import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";

export type ProductStatusDto = "IN-STOCK" | "OUT-OF-STOCK";

export interface ProductDto extends Product {
  status: ProductStatusDto;
}

export const getProducts = async (
  userId: string | undefined,
): Promise<ProductDto[]> => {
  if (!userId) {
    return [];
  }

  const products = await db.product.findMany({
    where: { userId },
  });
  return products.map((product) => ({
    ...product,
    status: product.stock === 0 ? "OUT-OF-STOCK" : "IN-STOCK",
  }));
};
