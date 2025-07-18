import "server-only";

import { db } from "@/app/_lib/prisma";

interface SaleProductDto {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface SalesDto {
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
  saleProducts: SaleProductDto[];
}


export const getSales = async (userId: string | undefined): Promise<SalesDto[]> => {

  if (!userId) {
    return [];
  }

  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: { product: true },
      },
    },
    where: {
      userId,
    },
  });
  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productNames: sale.saleProducts
      .map((saleProduct) => saleProduct.product.name)
      .join(" • "),
    totalAmount: sale.saleProducts.reduce(
      (acc, saleProduct) =>
        acc + saleProduct.quantity * Number(saleProduct.unitPrice),
      0,
    ),
    totalProducts: sale.saleProducts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
    saleProducts: sale.saleProducts.map((saleProduct) => ({
      productId: saleProduct.productId,
      productName: saleProduct.product.name,
      quantity: saleProduct.quantity,
      unitPrice: Number(saleProduct.unitPrice),
    })) as SaleProductDto[],
  }));
};
