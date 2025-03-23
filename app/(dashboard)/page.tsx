import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";

import ReveneuChart from "./_components/reveneu-chart";
import MostSoldProductsItem from "./_components/most-sold-product-item";
import TotalRevenueCard from "./_components/total-revenue-card";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalProductStock from "./_components/product-stock-card";
import TotalProducts from "./_components/total-products";
import { getTotalLast14DaysReveneu } from "../_data-access/dashboard/get-lastdays-revenue";
import { getMostSoldProducts } from "../_data-access/dashboard/get-most-sold-products";

const HomePage = async () => {
  const { mostSoldProducts } = await getMostSoldProducts();

  const totalLast14DaysReveneu = await getTotalLast14DaysReveneu();
  return (
    <div className="m-8 flex w-full flex-col space-y-8 rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral dos dados</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>

      <div className="grid grid-cols-2 gap-6">
        <TotalRevenueCard />
        <TodayRevenueCard />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <TotalSalesCard />
        <TotalProductStock />
        <TotalProducts />
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <p className="text-lg font-semibold text-slate-900">Receita</p>
          <p className="text-sm text-slate-400">Últimos 14 dias</p>
          <ReveneuChart data={totalLast14DaysReveneu} />
        </div>

        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
          <p className="p-6 text-lg font-semibold text-slate-900">
            Produtos mais vendidos
          </p>
          <div className="space-y-7 overflow-y-auto px-6 pb-6">
            {mostSoldProducts.map((product) => (
              <MostSoldProductsItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
