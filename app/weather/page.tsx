import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Weather = () => {
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
