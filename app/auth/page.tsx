import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import React from "react";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/client/LoginForm";
import SignUpForm from "@/components/client/SignUpForm";

async function page() {
  const session = await auth();

  if (session?.user) redirect("/weather");

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
              <SignUpForm />
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
