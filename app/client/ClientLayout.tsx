import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthResult, Session } from "next-auth";

function ClientLayout(props: {
  children: React.ReactNode;
  session: NextAuthResult;
}) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <Navbar />
        {props.children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default ClientLayout;
