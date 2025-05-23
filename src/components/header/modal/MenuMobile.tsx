"use client"

import React, {useEffect, useState} from "react";
import {
    BasketSvg,
    CloseSvg,
    HeartSvg, LogoutSvg,
    MenuPhoneSvg,
    OrderSvg,
    ProfileSvg, QuestionsSvg, TrackSvg
} from "@/assets";
import Link from "next/link";
import CitySelector from "@/components/ui/select/CitySelect";
import { useAuth } from "@/provider/AuthProvider";
import RegistrationModal from "@/components/header/modal/RegistrationModal";
import CartModal from "@/components/header/modal/CartModal";
import {usePathname, useRouter} from 'next/navigation';

interface MobileMenuProps {
    menuOpen: boolean;
    toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuOpen, toggleMenu }) => {
    const { isAuthenticated, logout } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setModalOpen(false);
        setCartOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);

    const handleLogout = async () => {
        logout();
        router.push("/");
    };

    const handleAuth = () => {
        if (!isAuthenticated) {
            toggleMenu();
            setModalOpen(true);
            return;
        }

        toggleMenu();
        router.push('/profile');
    }

    const handleLike = () => {
        if (!isAuthenticated) {
            toggleMenu();
            setModalOpen(true);
            return;
        }

        router.push("/profile?tab=saved");
    }

    const handleFaq = () => {
        if (!isAuthenticated) {
            toggleMenu();
            setModalOpen(true);
            return;
        }

        router.push("/profile?tab=faq");
    }

    const handleTrack = () => {
        if (!isAuthenticated) {
            toggleMenu();
            setModalOpen(true);
            return;
        }

        router.push("/profile?tab=track");
    }

    const handleOrder = () => {
        if (!isAuthenticated) {
            toggleMenu();
            setModalOpen(true);
            return;
        }

        router.push("/profile?tab=orders");
    }

    const toggleModal = () => {
        toggleMenu();
        setModalOpen(!modalOpen);
    };

    const toggleCart = () => {
        toggleMenu();
        setCartOpen(!cartOpen);
    }

    return (
        <>
            <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
            <div className={`container_header_mobile_menu ${menuOpen ? 'open' : ''}`}>
                <div className="box_top_mobile_menu">
                    <a href="#"></a>
                    <button
                        type="button"
                        className="button_close_mobile_menu"
                        onClick={toggleMenu}
                    >
                        <CloseSvg className="icon_close_mobile_menu"/>
                    </button>
                </div>
                <div className="container_content_mobile_menu">
                    <div className="decoration_line_mobile_menu"></div>
                    <CitySelector />
                    <div className="decoration_line_mobile_menu"></div>
                    <div className="box_top_content_mobile_menu">
                        <nav>
                            <ul className="list_menu_link_mobile">
                                <li><button className="link_mobile_menu" onClick={() => {toggleMenu(); router.push("/restaurant");}}>Заклади</button></li>
                                <li><Link className="link_mobile_menu" href="#">Акції</Link></li>
                                <li><Link className="link_mobile_menu" href="#">Про нас</Link></li>
                                <li><Link className="link_mobile_menu" href="#">Доставка та оплата</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="box_bottom_content_mobile_menu">
                        <div className="decoration_line_mobile_menu"></div>
                        <div className="box_custom_menu">
                            {isAuthenticated ? (
                                <>
                                    <button onClick={handleAuth} className="link_custom_mobile_menu">
                                        <ProfileSvg className="icon_custom_mobile_menu"/>
                                        <p className="text_custom_mobile_menu">Мій профіль</p>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleAuth} type="button" className="link_custom_mobile_menu">
                                        <ProfileSvg className="icon_custom_mobile_menu"/>
                                        <p className="text_custom_mobile_menu">Особисті дані</p>
                                    </button>
                                </>
                            )}
                            <button onClick={handleOrder} className="link_custom_mobile_menu">
                                <OrderSvg className="icon_custom_mobile_menu"/>
                                <p className="text_custom_mobile_menu">Мої замовлення</p>
                            </button>
                            <button onClick={handleLike} className="link_custom_mobile_menu">
                                <HeartSvg className="icon_custom_mobile_menu"/>
                                <p className="text_custom_mobile_menu">Улюблене</p>
                            </button>
                            <button onClick={toggleCart} className="link_custom_mobile_menu">
                                <BasketSvg className="icon_custom_mobile_menu"/>
                                <p className="text_custom_mobile_menu">Кошик</p>
                            </button>
                            {isAuthenticated && (
                                <>
                                    <button onClick={handleFaq} className="link_custom_mobile_menu">
                                        <QuestionsSvg className="icon_custom_mobile_menu"/>
                                        <p className="text_custom_mobile_menu">Часті запитання</p>
                                    </button>
                                    <button onClick={handleTrack} className="link_custom_mobile_menu">
                                        <TrackSvg className="icon_custom_mobile_menu"/>
                                        <p className="text_custom_mobile_menu">Відстежити замовлення</p>
                                    </button>
                                    <button className="link_custom_mobile_menu" onClick={handleLogout}>
                                        <LogoutSvg className="icon_custom_mobile_menu"/>
                                        <p className="text_custom_mobile_menu">Вийти</p>
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="decoration_line_mobile_menu"></div>
                        <div className="box_phone_mobile_menu">
                            <a href="tel:0800204090" className="link_phone_mobile_menu">
                                <MenuPhoneSvg className="icon_phone_mobile_menu w-4 h-4"/>
                                <p className="text_phone_mobile_menu">0 800 204 090</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <CartModal cartOpen={cartOpen} toggleCart={toggleCart}/>
            <RegistrationModal isOpen={modalOpen} onClose={toggleModal} />
        </>
    );
};

export default MobileMenu;
