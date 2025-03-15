"use client"
import { ReactNode, useEffect } from "react";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.location.pathname === "/") {
      redirect("/en");
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
          {children}
    </html>
  );
}
