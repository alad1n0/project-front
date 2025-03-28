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
import { useRouter } from 'next/navigation';

interface MobileMenuProps {
    menuOpen: boolean;
    toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuOpen, toggleMenu }) => {
    const { isAuthenticated, logout } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const router = useRouter();

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
                                <li><Link className="link_mobile_menu" href={"/restaurant"}>Заклади</Link></li>
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
                                    <button onClick={toggleModal} type="button" className="link_custom_mobile_menu">
                                        <ProfileSvg className="icon_custom_mobile_menu"/>
                                        <p className="text_custom_mobile_menu">Особисті дані</p>
                                    </button>
                                </>
                            )}
                            <Link href="" onClick={handleAuth} className="link_custom_mobile_menu">
                                <OrderSvg className="icon_custom_mobile_menu"/>
                                <p className="text_custom_mobile_menu">Мої замовлення</p>
                            </Link>
                            <Link href="" onClick={handleAuth} className="link_custom_mobile_menu">
                                <HeartSvg className="icon_custom_mobile_menu"/>
                                <p className="text_custom_mobile_menu">Улюблене</p>
                            </Link>
                            <button onClick={toggleCart} className="link_custom_mobile_menu">
                                <BasketSvg className="icon_custom_mobile_menu"/>
                                <p className="text_custom_mobile_menu">Кошик</p>
                            </button>
                            {isAuthenticated && (
                                <>
                                    <Link href="" className="link_custom_mobile_menu">
                                        <QuestionsSvg className="icon_custom_mobile_menu"/>
                                        <p className="text_custom_mobile_menu">Часті запитання</p>
                                    </Link>
                                    <Link href="" className="link_custom_mobile_menu">
                                        <TrackSvg className="icon_custom_mobile_menu"/>
                                        <p className="text_custom_mobile_menu">Відстежити замовлення</p>
                                    </Link>
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
