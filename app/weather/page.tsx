"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchData } from "../actions/fetchWeather";
import { toast } from "sonner";
import WeatherDashboard from "../components/WeatherDashboard";

const Weather = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // if (!session?.user) return null;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!session?.user) {
      router.replace("/auth");
    }
  }, [session, router]);

  const submitHandler = async (formdata: FormData) => {
    const city = formdata.get("city") as string;
    if (city) {
      const toastId = toast.loading("fetching data");
      const response = await fetchData(city);
      formdata.set("city", "");
      setWeatherData(response);
      toast.success("success", {
        id: toastId,
      });
    }
  };

  return (
    <div className="items-center">
      <form action={(formData) => submitHandler(formData)}>
        <Input
          className="w-96 mt-14 mx-auto"
          name="city"
          placeholder="Enter your city here"
        />
        <div className="flex justify-center mt-3">
          <Button type="submit" variant={"destructive"} className="">
            Search
          </Button>
        </div>
      </form>
      <WeatherDashboard data={weatherData} />
    </div>
  );
};

export default Weather;
