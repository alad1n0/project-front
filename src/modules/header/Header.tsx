"use client";

import {cn} from "@/helpers/cn";
import React, {useState, useEffect} from "react";
import {
    BurgerMenuSvg,
    BasketSvg,
    SearchSvg,
    ProfileSvg,
    HeartSvg,
    HeartHeaderSvg,
    PhoneSvg, LogoSvg,
} from "@/assets";
import Link from "next/link";
import RegistrationModal from "@/components/header/modal/RegistrationModal";
import MobileMenu from "@/components/header/modal/MenuMobile";
import CartModal from "@/components/header/modal/CartModal";
import CitySelector from "@/components/ui/select/CitySelect";
import { useAuth } from "@/provider/AuthProvider";
import {useRouter} from "next/navigation";
import { useBasket } from "@/provider/BasketProvider";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const { count } = useBasket();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 150);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLike = () => {
        if (!isAuthenticated) {
            setModalOpen(true);
            return;
        }

        router.push("/profile?tab=saved");
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    }

    const toggleModal = () => {
        if (!isAuthenticated) {
            setModalOpen(!modalOpen);
            return;
        }

        router.push("/profile");
    };

    return (
        <>
            <header className={cn("header_wrapper", scrolled && "scrolled")}>
                <div className="container_header_desktop">
                    <div className="box_top_header_desktop">
                        <div className="box_location_burgers_header">
                            <div className="box_btn_burger_desktop">
                                <button type="button"
                                        className="button_burger btn_burger_desktop"
                                        onClick={toggleMenu}
                                >
                                    <BurgerMenuSvg className="icon_burger_desktop"/>
                                </button>
                            </div>
                            <CitySelector/>
                        </div>

                        {/*<Link href={"/"} className="logo_header_desktop"><LogoSvg className="icon_logo_header_desktop" /></Link>*/}

                        <div className="box_phone_buttons_header_desktop">
                            <div className="box_phone_header_desktop">
                                <a href="tel:0800204090" className="link_phone_header_desktop">
                                    <PhoneSvg className="icon_phone_header_desktop"/>
                                    <p className="text_phone_header_desktop">0 800 204 090</p>
                                </a>
                            </div>
                            <div className="box_buttons_header_custom box_buttons_header_custom_box_top">
                                <Link href="" className="link_custom_header">
                                    <SearchSvg className="icon_custom_header"/>
                                </Link>

                                <Link href="" onClick={handleLike} className="link_custom_header">
                                    <HeartSvg className="icon_custom_header"/>
                                </Link>

                                <button type="button" className="link_custom_header" onClick={toggleModal}>
                                    <ProfileSvg className="icon_custom_header" />
                                </button>

                                <button type="button"
                                        className="button_cart_header_desktop"
                                        onClick={toggleCart}
                                >
                                    <span className="box_icon_cart_header_desktop">
                                        <BasketSvg className="icon_cart_header_desktop"/>
                                        {count !== null && count > 0 && (
                                            <span className="number_product">{count}</span>
                                        )}
                                    </span>
                                    <p className="text_cart_header_desktop">Кошик</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="decoration_line_horizontal"></div>

                    <div className="box_bottom_header_desktop">
                        <nav>
                            <ul className="list_menu_link_desktop">
                                <li><Link className="link_desktop_menu" href={"/restaurant"}>Заклади</Link></li>
                                <li><Link className="link_desktop_menu" href="#">Акції</Link></li>
                                <li><Link className="link_desktop_menu" href="#">Про нас</Link></li>
                                <li><Link className="link_desktop_menu" href="#">Доставка та оплата</Link></li>
                            </ul>
                        </nav>

                        <div className="box_buttons_header_custom">
                            <Link href="#" className="link_custom_header">
                                <SearchSvg className="icon_custom_header"/>
                            </Link>

                            <button onClick={handleLike} className="link_custom_header">
                                <HeartHeaderSvg className="icon_custom_header"/>
                            </button>

                            <button type="button" className="link_custom_header" onClick={toggleModal}>
                                <ProfileSvg className="icon_custom_header"/>
                            </button>

                            <button type="button"
                                    className="button_cart_header_desktop"
                                    onClick={toggleCart}
                            >
                                <span className="box_icon_cart_header_desktop">
                                    <BasketSvg className="icon_cart_header_desktop"/>
                                    {count !== null && count > 0 && (
                                        <span className="number_product">{count}</span>
                                    )}
                                </span>
                                <p className="text_cart_header_desktop">Кошик</p>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="container_header_mobile">
                    {/*<Link href="#"><LogoSvg className="icon_logo_header"/></Link>*/}
                    <button type="button"
                            className="button_burger"
                            onClick={toggleMenu}
                            id="openMobileMenu"
                    >
                        <BurgerMenuSvg className="icon_burger_mobile"/>
                    </button>
                </div>
            </header>

            <MobileMenu menuOpen={menuOpen} toggleMenu={toggleMenu}/>
            <CartModal cartOpen={cartOpen} toggleCart={toggleCart}/>
            <RegistrationModal isOpen={modalOpen} onClose={toggleModal} />
        </>
    );
};