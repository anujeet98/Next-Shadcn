"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { signupHandler } from "@/app/actions/signup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;
        if (!email || !password) {
          return toast.error("Invalid credentials provided");
        }

        const toastId = toast.loading("Logging In");

        const error = await signupHandler(formData);
        if (!error) {
          toast.success("signup success", {
            id: toastId,
          });
          return router.replace("/weather");
        } else
          toast.error(String(error), {
            id: toastId,
          });
      }}
      className="flex flex-col gap-4">
      <Input type="email" placeholder="email" name="email"></Input>
      <Input type="password" placeholder="password" name="password"></Input>
      <Button type="submit" className="mx-auto">
        <Mail className="mr-2 h-4 w-4" /> SignUp with Email
      </Button>
    </form>
  );
}

export default SignUpForm;
