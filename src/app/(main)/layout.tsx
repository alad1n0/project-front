"use client"

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import MainLayout from "@/layouts/layout/MainLayout";
import {AuthProvider} from "@/provider/AuthProvider";
import {SessionProvider} from "next-auth/react";
import React from "react";
import "./globals.css";
import {BasketProvider} from "@/provider/BasketProvider";

const queryClient = new QueryClient();

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <AuthProvider>
                    <BasketProvider>
                        <MainLayout>
                            {children}
                        </MainLayout>
                    </BasketProvider>
                </AuthProvider>
            </SessionProvider>
        </QueryClientProvider>
    );
}