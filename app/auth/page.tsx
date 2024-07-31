import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

import React from "react";
import { auth, signIn } from "@/auth";
import { connectToDB } from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import LoginForm from "@/components/client/LoginForm";

async function page() {
  const session = await auth();

  if (session?.user) redirect("/users");
  const signupHandler = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email && !password) {
      throw new Error("Invalid credentials provided");
    }

    await connectToDB();

    const user = await User.findOne({ email });
    if (user) throw new Error("user already exists");

    const hashedPassword = await hash(password as string, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    redirect("/auth");
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>
                Enter your details or continue with google
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <span>or</span>
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}>
                <Button type="submit" variant={"outline"}>
                  <img
                    src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                    className="box-content size-5 mr-1"></img>
                  Login with Google
                </Button>
              </form>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Lets begin!</CardTitle>
              <CardDescription>
                Enter your details or continue with google
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={signupHandler} className="flex flex-col gap-4">
                <Input type="email" placeholder="email" name="email"></Input>
                <Input
                  type="password"
                  placeholder="password"
                  name="password"></Input>
                <Button type="submit" className="mx-auto">
                  <Mail className="mr-2 h-4 w-4" /> SignUp with Email
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <span>or</span>
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}>
                <Button type="submit" variant={"outline"}>
                  <img
                    src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                    className="box-content size-5 mr-1"></img>
                  SingnUp with Google
                </Button>
              </form>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
