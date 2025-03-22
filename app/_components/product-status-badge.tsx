import { ProductStatusDto } from "../_data-access/product/get-products";
import { Badge } from "./ui/badge";

interface ProductStatusBadgeProps {
  status: ProductStatusDto;
}

const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const getStatusLabel = (status: string) => {
    if (status === "IN-STOCK") {
      return "Em estoque";
    }
    return "Fora de estoque";
  };
  const label = getStatusLabel(status);
  return (
    <Badge
      variant={label === "Em estoque" ? "default" : "outline"}
      className="gap-1.5"
    >
      {label}
    </Badge>
  );
};

export default ProductStatusBadge;
