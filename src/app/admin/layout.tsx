"use client"

import React from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import "./globals.css";
import {AdminAuthProvider} from "@/provider/AdminAuthProvider";

const queryClient = new QueryClient();

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AdminAuthProvider>
                <main className="flex h-screen justify-center items-center">
                    {children}
                </main>
            </AdminAuthProvider>
        </QueryClientProvider>
    );
}