"use client"

import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from "@/layouts/layout/MainLayout";
import {AuthProvider} from "@/provider/AuthProvider";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <MainLayout>
                    {children}
                </MainLayout>
            </AuthProvider>
        </QueryClientProvider>
    );
}