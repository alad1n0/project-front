import React from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen justify-center items-center">
      {children}
    </main>
  );
}