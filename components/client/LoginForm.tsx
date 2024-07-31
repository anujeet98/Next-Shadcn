"use client";

import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { loginHandler } from "@/app/actions/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;
        console.log("hehe", email, password);
        if (!email && !password) {
          return toast.error("Invalid credentials provided");
        }

        const toastId = toast.loading("Logging In");

        const error = await loginHandler(formData);
        if (!error) {
          toast.success("login success", {
            id: toastId,
          });
          router.refresh();
        } else
          toast.error(String(error), {
            id: toastId,
          });
      }}
      className="flex flex-col gap-4">
      <Input type="email" placeholder="email" name="email"></Input>
      <Input type="password" placeholder="password" name="password"></Input>
      <Button type="submit" className="mx-auto">
        <Mail className="mr-2 h-4 w-4" /> Login with Email
      </Button>
    </form>
  );
};

export default LoginForm;
