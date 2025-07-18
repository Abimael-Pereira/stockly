"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UpsertSalesTableDropdownMenu from "./upsert-table-dropdown-menu";
import { toast } from "sonner";
import { upsertSale } from "@/app/_actions/sales/upsert-sale";
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";
import { ProductDto } from "@/app/_data-access/product/get-products";

const formSchema = z.object({
  productId: z.string().uuid({ message: "Produto é obrigatório." }),
  quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface UpsertSheetContentProps {
  isOpen: boolean;
  saleId?: string;
  products: ProductDto[];
  productOptions: ComboboxOption[];
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>;
  defaultSelectedProduct?: SelectedProduct[];
  userId: string | undefined;
}

const UpsertSheetContent = ({
  isOpen,
  saleId,
  productOptions,
  products,
  setSheetIsOpen,
  defaultSelectedProduct,
  userId,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    defaultSelectedProduct ?? [],
  );

  const { execute: executeUpsertSale } = useAction(upsertSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattendErrors = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flattendErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda realizada com sucesso.");
      setSheetIsOpen(false);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset();
      setSelectedProducts([]);
    }
  }, [isOpen, form]);

  useEffect(() => {
    setSelectedProducts(defaultSelectedProduct ?? []);
  }, [defaultSelectedProduct]);

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );

      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: "Quantidade excede o estoque disponível.",
          });
          return currentProducts;
        }

        form.reset();

        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }

      const productIsOutOfStock = data.quantity > selectedProduct.stock;
      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade excede o estoque disponível.",
        });
        return currentProducts;
      }

      form.reset();

      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
  }, [selectedProducts]);

  const onDelete = (productId: string) => {
    setSelectedProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  };

  const onSubmitSale = async () => {
    executeUpsertSale({
      id: saleId,
      userId,
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    options={productOptions}
                    placeholder="Selecione um produto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full gap-2" variant="secondary">
            <PlusIcon size={20} />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista dos produtos adicionados à venda</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <UpsertSalesTableDropdownMenu
                  onDelet={onDelete}
                  product={product}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className="pt-6">
        <Button
          className="w-full gap-2"
          disabled={!selectedProducts.length}
          onClick={onSubmitSale}
        >
          <CheckIcon size={20} />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
