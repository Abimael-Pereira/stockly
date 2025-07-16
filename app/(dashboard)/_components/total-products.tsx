import { ShoppingBasketIcon } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { getTotalProducts } from "@/app/_data-access/dashboard/get-total-products";

const TotalProducts = async ({ userId }: { userId: string | undefined }) => {
  const totalProducts = await getTotalProducts(userId);
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <ShoppingBasketIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Produtos</SummaryCardTitle>
      <SummaryCardValue>{totalProducts}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalProducts;
