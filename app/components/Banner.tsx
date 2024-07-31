import React from "react";

const Banner = () => {
  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?weather')",
      }}>
      <div className="bg-black bg-opacity-50 p-10 rounded">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Weather App</h1>
        <p className="text-xl">
          Your one-stop solution for all weather updates.
        </p>
      </div>
    </div>
  );
};

export default Banner;
