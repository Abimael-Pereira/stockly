import { Button } from "@/app/_components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google");

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Faça seu login para continuar
          </DialogTitle>
          <DialogDescription className="text-center">
            Faça o login com sua conta Google para acessar os dados.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={handleLoginWithGoogleClick} className="text-center">
          {" "}
          <Image src={"/google-icon.svg"} height={18} width={18} alt="google" />
          Fazer login
        </Button>
      </DialogContent>
    </div>
  );
};

export default LoginDialog;
