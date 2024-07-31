"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export const loginHandler = async (formData: FormData) => {
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;
    try {
      await signIn("credentials", {
        email,
        password,
      });
    } catch (err) {
      const error = err as CredentialsSignin;
      return error.cause;
    } 
  };