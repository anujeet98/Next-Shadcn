import { Card, CardContent, CardDescription } from "@/components/ui/card";
import React, { ReactNode } from "react";

function WeatherDashboard(props: { data: any }) {
  if (!props.data) return null;

  const sunriseDate = new Date(props.data.sys.sunrise * 1000);
  const sunriseTime = `${sunriseDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${sunriseDate.getMinutes().toString().padStart(2, "0")}`;

  const sunsetDate = new Date(props.data.sys.sunset * 1000);
  const sunsetTime = `${sunsetDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${sunsetDate.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="w-96 mx-auto">
        <Card className="h-28">
          <CardDescription className="flex justify-between text-3xl px-4 py-8">
            <span>{props?.data?.main.temp} °C</span>
            <span>
              {props?.data?.name}, {props?.data?.sys.country}
            </span>
          </CardDescription>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-96 mx-auto">
        <Card className="h-20">
          <CardDescription className="flex justify-between px-4 py-4">
            <span>
              <img src="/sunset.png" alt="sunset" className="h-12 w-12" />
            </span>
            <span className="flex flex-col">
              <span className="text-1xl">Sunset</span>
              <span>{sunsetTime} pm</span>
            </span>
          </CardDescription>
        </Card>
        <Card className="h-20">
          <CardDescription className="flex justify-between px-4 py-4">
            <span>
              <img src="/sunrise.png" alt="sunrise" className="h-12 w-12" />
            </span>
            <span className="flex flex-col">
              <span className="text-1xl">Sunrise</span>
              <span>{sunriseTime} pm</span>
            </span>
          </CardDescription>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-96 mx-auto">
        <Card className="h-20">
          <CardDescription className="flex justify-between px-4 py-4">
            <span>
              <img src="wind.png" alt="wind" className="h-12 w-12" />
            </span>
            <span className="flex flex-col">
              <span className="text-1xl">Wind</span>
              <span>{props?.data?.wind.speed} km/hr</span>
            </span>
          </CardDescription>
        </Card>
        <Card className="h-20">
          <CardDescription className="flex justify-between px-4 py-4">
            <span>
              <img src="humidity.png" alt="humidity" className="h-12 w-12" />
            </span>
            <span className="flex flex-col">
              <span className="text-1xl">Humidity</span>
              <span>{props?.data?.main.humidity} %</span>
            </span>
          </CardDescription>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-96 mx-auto">
        <Card className="h-20">
          <CardDescription className="flex justify-between px-4 py-4">
            <span>
              <img src="feel.png" alt="feelsLike" className="h-12 w-12" />
            </span>
            <span className="flex flex-col">
              <span className="text-1xl">Feels Like</span>
              <span>{props?.data?.main.feels_like} °C</span>
            </span>
          </CardDescription>
        </Card>
        <Card className="h-20">
          <CardDescription className="flex justify-between px-4 py-4">
            <span>
              <img src="visib.png" alt="visibility" className="h-12 w-12" />
            </span>
            <span className="flex flex-col">
              <span className="text-1xl">Visibility</span>
              <span>{props?.data?.visibility} KM</span>
            </span>
          </CardDescription>
        </Card>
      </div>
    </div>
  );
}

export default WeatherDashboard;
