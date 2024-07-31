"use client";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleAuth = async () => {
    if (session?.user) {
      await signOut();
      router.refresh();
      return;
    }
    router.push("/auth");
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Weather App</div>
        <div className="space-x-4 flex items-center">
          <ModeToggle />
          <a href="/" className="text-gray-300 hover:text-white">
            Home
          </a>
          <a href="about" className="text-gray-300 hover:text-white">
            About
          </a>
          {session?.user ? (
            <a href="weather" className="text-gray-300 hover:text-white">
              weather
            </a>
          ) : (
            ""
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAuth}>
            {session?.user ? "Logout" : "Login / Signup"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
