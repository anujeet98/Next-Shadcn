"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Weather = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session?.user) return router.replace("/auth");
  return (
    <div className="items-center">
      <Input
        className="w-96 mt-14 mx-auto"
        name="city"
        placeholder="Enter your city here"
      />
      <div className="flex justify-center mt-3">
        <Button variant={"destructive"} className="">
          Search
        </Button>
      </div>
    </div>
  );
};

export default Weather;
