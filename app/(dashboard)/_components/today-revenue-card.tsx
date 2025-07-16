import { getTodayRevenue } from "@/app/_data-access/dashboard/get-today-revenue";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { formatCurrency } from "@/app/_helpers/currency";
import { DollarSign } from "lucide-react";

const TodayRevenueCard = async ({ userId }: { userId: string | undefined }) => {
  const todayRevenue = await getTodayRevenue(userId);
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <DollarSign />
      </SummaryCardIcon>
      <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TodayRevenueCard;
