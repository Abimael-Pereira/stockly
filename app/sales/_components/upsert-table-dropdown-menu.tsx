import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { MoreHorizontalIcon, ClipboardCopyIcon, TrashIcon } from "lucide-react";

interface SalesTableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelet: (productId: string) => void;
}

const UpsertSalesTableDropdownMenu = ({
  product,
  onDelet,
}: SalesTableDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <MoreHorizontalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-1.5"
          onClick={() => navigator.clipboard.writeText(product.id)}
        >
          <ClipboardCopyIcon size={16} className="mr-2" />
          Copiar ID
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-1.5"
          onClick={() => onDelet(product.id)}
        >
          <TrashIcon size={16} className="mr-2" />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpsertSalesTableDropdownMenu;
