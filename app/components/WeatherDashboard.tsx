import React, { ReactNode } from "react";

function WeatherDashboard(props: { data: any }) {
  return <div>{JSON.stringify(props.data)}</div>;
}

export default WeatherDashboard;
