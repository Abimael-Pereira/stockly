"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { LogInIcon } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import LoginDialog from "./login-dialog";

const LoginButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            {session.user?.email}
          </span>
          <h2 className="text-xl font-semibold">{session.user?.name}</h2>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={session.user?.image || "/default-avatar.png"}
            alt={session.user?.name || "User Avatar"}
            className="rounded-full"
          />
        </Avatar>
      </div>
    );
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button>
          {" "}
          <LogInIcon />
          Fazer login
        </Button>
      </DialogTrigger>

      <LoginDialog />
    </Dialog>
  );
};

export default LoginButton;
