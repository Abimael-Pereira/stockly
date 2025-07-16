import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";

import TotalRevenueCard from "./_components/total-revenue-card";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalProductStock from "./_components/product-stock-card";
import TotalProducts from "./_components/total-products";
import LoginButton from "./_components/login-button";
import { Suspense } from "react";
import { SummaryCardSkeleton } from "./_components/summary-card";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";
import { Skeleton } from "../_components/ui/skeleton";
import MostSoldProducts, {
  MostSoldProductsSkeleton,
} from "./_components/most-sold-product-card";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  return (
    <div className="m-8 flex w-full flex-col space-y-8 rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral dos dados</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
        <div className="flex items-center space-x-4">
          {!session && <h3>Acesse sua conta para visualizar os dados</h3>}
          <LoginButton />
        </div>
      </Header>

      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard userId={userId} />
        </Suspense>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TodayRevenueCard userId={userId} />
        </Suspense>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <TotalSalesCard userId={userId} />
        <TotalProductStock userId={userId} />
        <TotalProducts userId={userId} />
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <Suspense
          fallback={
            <Skeleton className="bg-white p-6">
              <div className="space-y-2">
                <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
                <div className="h-4 w-48 rounded-md bg-gray-200" />
              </div>
            </Skeleton>
          }
        >
          <Last14DaysRevenueCard userId={userId} />
        </Suspense>

        <Suspense fallback={<MostSoldProductsSkeleton />}>
          <MostSoldProducts userId={userId} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
