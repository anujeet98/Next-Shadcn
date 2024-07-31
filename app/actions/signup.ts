"use server";
import { connectToDB } from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";


export const signupHandler = async (formData: FormData) => {

    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    try{
        if (!email || !password) {
            throw new CredentialsSignin({cause: "Invalid credentials provided"});
          }
      
          await connectToDB();
          const user = await User.findOne({ email });
          if (user) throw new CredentialsSignin({cause: "user already exists"});
      
          const hashedPassword = await hash(password as string, 10);
      
          await User.create({
            email,
            password: hashedPassword,
          });
      
          redirect("/auth");
    }
    catch(err){
        const error = err as CredentialsSignin;
        return error.cause;
    }
  };