"use client";

import {ReactNode, FC, useEffect, useState} from 'react';
import Header from "@/modules/header/Header";
import Footer from '@/modules/footer/Footer';
import {usePathname} from "next/navigation";

interface IChildSubContainerAuth {
    children?: ReactNode;
}

const MainLayout: FC<IChildSubContainerAuth> = ({ children }) => {
    const pathname = usePathname();
    const isRestaurantPage = pathname.startsWith("/restaurant");

    const [isMobile, setIsMobile] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        setIsLoaded(true);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isLoaded) {
        return null;
    }

    return (
        <div className="w-full min-h-screen">
            {!(isRestaurantPage && isMobile) && <Header /> }
            <main className={`main-content-container ${isRestaurantPage && isMobile ? 'main-content-container-res' : ''}`}>
                {children}
            </main>
            {!(isRestaurantPage && isMobile) && <Footer /> }
        </div>
    );
};

export default MainLayout;