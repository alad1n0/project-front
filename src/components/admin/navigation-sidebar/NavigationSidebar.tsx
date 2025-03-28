"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    TrendingUp,
    ListChecks,
    Users,
    Group,
    Wallet,
    CalendarClock,
    Gem,
    LogOut,
} from "lucide-react";
import { useState } from "react";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
    },
    {
        label: "All Expenses",
        icon: ListChecks,
        href: "/admin/all",
    },
    {
        label: "Marketing",
        icon: Wallet,
        href: "/admin/marketing",
    },
    {
        label: "Deposit",
        icon: Gem,
        href: "/admin/deposit",
    },
    {
        label: "Companies",
        icon: Group,
        href: "/admin/team-lead",
    },
    {
        label: "A/B Testing",
        icon: TrendingUp,
        href: "/admin/abtesting",
    },
    {
        label: "Schedule",
        icon: CalendarClock,
        href: "/admin/schedule",
    },
    {
        label: "Candidates",
        icon: Users,
        href: "/admin/candidates",
    },
];

export function NavigationSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    const handleLogout = async () => {

    };

    return (
        <div className="navigation-sidebar">
            <div className="px-3 py-2 flex-1">
                <Link href="/admin/dashboard" className="flex items-center justify-center mb-10">
                    <h1 className="text-2xl font-bold">EatsEasy</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-zinc-300/50 rounded-lg transition",
                                pathname === route.href
                                    ? "text-primary bg-zinc-300/50"
                                    : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3")} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <div className="flex items-center justify-between mb-2 px-4">
                    <button>
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}