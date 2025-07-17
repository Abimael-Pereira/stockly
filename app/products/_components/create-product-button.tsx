"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import UpsertProductDialogContent from "./upsert-dialog-content";
import { useState } from "react";
import { useSession } from "next-auth/react";
import LoginUpsertDialog from "@/app/(dashboard)/_components/login-dialog";

const CreateProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </DialogTrigger>

      {session?.user ? (
        <UpsertProductDialogContent
          userId={session.user.id}
          setDialogIsOpen={setDialogIsOpen}
        />
      ) : (
        <LoginUpsertDialog />
      )}
    </Dialog>
  );
};

export default CreateProductButton;
