"use client";

import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import SalesTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface SaleTableComumn extends SalesDto {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SaleTableComumn>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de produtos",
  },
  {
    header: "Valor total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: ({ row: { original: sale } }) => (
      <SalesTableDropdownMenu
        sale={sale}
        productOptions={sale.productOptions}
        products={sale.products}
      />
    ),
  },
];
