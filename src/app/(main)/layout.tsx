"use client"

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import MainLayout from "@/layouts/layout/MainLayout";
import {AuthProvider} from "@/provider/AuthProvider";
import {SessionProvider} from "next-auth/react";
import React from "react";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <AuthProvider>
                    <MainLayout>
                        {children}
                    </MainLayout>
                </AuthProvider>
            </SessionProvider>
        </QueryClientProvider>
    );
}