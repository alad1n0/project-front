"use client";

import React, { useEffect, useState } from "react";
import {
    ArrowSvg,
    HeartHeaderSvg, HeartLikeSvg,
    LogoutSvg,
    OrderSvg, ProfileFillSvg,
    ProfileIconSvg,
    ProfileSvg, QuestionsFillSvg,
    QuestionsSvg, TrackOrderSvg,
} from "@/assets";
import MenuItem from "@/components/ui/menu-item/menu-item";
import ProfileData from "@/components/main/profile/tabs/ProfileData";
import SavedItems from "@/components/main/profile/tabs/SavedItems";
import MyOrders from "@/components/main/profile/tabs/MyOrders";
import FAQ from "@/components/main/profile/tabs/FAQ";
import TrackOrder from "@/components/main/profile/tabs/TrackOrder";
import { useRouter, useSearchParams } from "next/navigation";

const menuItems = [
    { key: "profile", title: "Особисті дані", Icon: ProfileSvg, SelectedIcon: ProfileFillSvg, ArrowIcon: ArrowSvg, content: <ProfileData /> },
    { key: "orders", title: "Мої замовлення", Icon: OrderSvg, SelectedIcon: OrderSvg, ArrowIcon: ArrowSvg, content: <MyOrders /> },
    { key: "faq", title: "Часті запитання", Icon: QuestionsSvg, SelectedIcon: QuestionsFillSvg, ArrowIcon: ArrowSvg, content: <FAQ /> },
    { key: "track", title: "Відстежити замовлення", Icon: TrackOrderSvg, SelectedIcon: TrackOrderSvg, ArrowIcon: ArrowSvg, content: <TrackOrder /> },
    { key: "saved", title: "Збережене", Icon: HeartHeaderSvg, SelectedIcon: HeartLikeSvg, ArrowIcon: ArrowSvg, content: <SavedItems /> },
    { key: "logout", title: "Вихід", Icon: LogoutSvg },
];

export default function Profile() {
    const [selected, setSelected] = useState<string>("profile");
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const tabFromQuery = searchParams.get("tab");
        if (tabFromQuery) {
            const isValidKey = menuItems.some(item => item.key === tabFromQuery);
            if (isValidKey) {
                setSelected(tabFromQuery);
            }
        } else {
            setSelected("profile");
        }
    }, [searchParams]);

    const handleTabClick = (key: string) => {
        setSelected(key);
        if (key === "profile") {
            router.push("/profile");
        } else {
            router.push(`/profile?tab=${key}`);
        }
    };

    return (
        <div className="container_profile">
            <div className="menu_profile">
                <div className="profile_info">
                    <ProfileIconSvg className="profile_icon" />
                    <div className="profile_name">
                        <h2>Андрій Коваленко</h2>
                        <p>+38 (063)433-89-57</p>
                    </div>
                </div>
                <div className="profile_menu_container">
                    {menuItems.map((item, index) => (
                        <React.Fragment key={item.key}>
                            <MenuItem
                                title={item.title}
                                Icon={item.Icon}
                                SelectedIcon={item.SelectedIcon}
                                ArrowIcon={item.ArrowIcon}
                                isSelected={selected === item.key}
                                onClick={() => handleTabClick(item.key)}
                            />
                            {index !== menuItems.length - 1 && <div className="decoration_line_horizontal" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="content_profile">
                {menuItems.find(item => item.key === selected)?.content}
            </div>
        </div>
    );
}