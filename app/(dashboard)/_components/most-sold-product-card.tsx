import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";
import MostSoldProductsItem from "./most-sold-product-item";
import { Skeleton } from "@/app/_components/ui/skeleton";

const MostSoldProducts = async ({ userId }: { userId: string | undefined }) => {
  const { mostSoldProducts } = await getMostSoldProducts(userId);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
      <p className="p-6 text-lg font-semibold text-slate-900">
        Produtos mais vendidos
      </p>
      <div className="space-y-7 overflow-y-auto px-6 pb-6">
        {mostSoldProducts &&
          mostSoldProducts.map((product) => (
            <MostSoldProductsItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

const MostSoldProductItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between space-y-2 pt-5">
      <div className="space-y-2">
        <div className="h-[22px] w-[91.23px] rounded-md bg-gray-200" />
        <div className="h-5 w-[91.23px] rounded-md bg-gray-200" />
        <div className="h-6 w-[105.23px] rounded-md bg-gray-200" />
      </div>
      <div>
        <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
      </div>
    </div>
  );
};

export const MostSoldProductsSkeleton = () => {
  return (
    <Skeleton className="bg-white p-6">
      <div className="space-y-2">
        <div className="h-5 w-52 rounded-md bg-gray-200" />
        <MostSoldProductItemSkeleton />
        <MostSoldProductItemSkeleton />
        <MostSoldProductItemSkeleton />
        <MostSoldProductItemSkeleton />
      </div>
    </Skeleton>
  );
};

export default MostSoldProducts;
