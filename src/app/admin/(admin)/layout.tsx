"use client"

import AdminLayout from "@/layouts/layout/AdminLayout";
import {AdminAuthProvider} from "@/provider/AdminAuthProvider";
import React from "react";

export default function MainLayout({children}: { children: React.ReactNode }) {
    return (
        <AdminAuthProvider>
            <AdminLayout>
                {children}
            </AdminLayout>
        </AdminAuthProvider>
    );
}