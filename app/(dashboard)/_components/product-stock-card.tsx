import { PackageIcon } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { getTotalStock } from "@/app/_data-access/dashboard/get-product-stock";

const TotalProductStock = async ({
  userId,
}: {
  userId: string | undefined;
}) => {
  const totalStock = await getTotalStock(userId);
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <PackageIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Total em estoque</SummaryCardTitle>
      <SummaryCardValue>{totalStock}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalProductStock;
