"use client";

import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex w-64 flex-col justify-between bg-white">
      <div>
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold">STOCKLY</h1>
        </div>

        <div className="flex flex-col gap-2 p-2">
          <SidebarButton href={"/"}>
            <LayoutGridIcon size={20} />
            Dashboard
          </SidebarButton>

          <SidebarButton href={"/products"}>
            <PackageIcon size={20} />
            Produtos
          </SidebarButton>

          <SidebarButton href={"/sales"}>
            <ShoppingBasketIcon size={20} />
            Vendas
          </SidebarButton>
        </div>
      </div>

      {session && (
        <div className="p-2">
          <Button
            className="w-full p-2"
            onClick={async () => {
              await signOut({ callbackUrl: "/" });
            }}
          >
            Sair da conta
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
