"use client";

import React, {useEffect, useState} from "react";
import CartModal from "@/components/header/modal/CartModal";
import Link from "next/link";
import {BasketSvg, EmptyHomeSvg, HomeSvg, ProfileSvg, SearchSvg} from "@/assets";
import RegistrationModal from "@/components/header/modal/RegistrationModal";
import {useAuth} from "@/provider/AuthProvider";
import {usePathname, useRouter} from "next/navigation";

export default function Header() {
    const [cartOpen, setCartOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState("/");
    const [modalOpen, setModalOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/profile") {
            setActiveMenuItem("profile");
        } else if (pathname === "/") {
            setActiveMenuItem("/");
        }
    }, [pathname]);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleAuth = () => {
        if (!isAuthenticated) {
            setModalOpen(true);
            return;
        }

        router.push('/profile');
    }

    return (
        <>
            <footer className="footer_wrapper">
                <div className="container_footer">
                    <div className="container_top_footer">
                        <div className="box_top_content_footer">
                            {/*<a href="index.html">*/}
                            {/*    <img className="icon_logo_footer" src="./image/icons/icon_footer.svg" alt="logo"/>*/}
                            {/*</a>*/}
                        </div>
                        <div className="container_links_footer">
                            <ul className="box_list_links_footer">
                                <li className="item_links_footer"><Link className="link_footer" href="#">Заклади</Link></li>
                                <li className="item_links_footer"><Link className="link_footer" href="#">Акції</Link></li>
                                <li className="item_links_footer"><Link className="link_footer" href="#">Про нас</Link></li>
                                <li className="item_links_footer"><Link className="link_footer" href="#">Доставка та оплата</Link></li>
                            </ul>
                            <div className="decoration_line_footer mobile"></div>
                            <ul className="box_list_links_footer">
                                <li className="item_links_footer"><Link className="link_footer" href="#">Політика використання cookies</Link></li>
                                <li className="item_links_footer"><Link className="link_footer" href="#">Договір публічної оферти</Link></li>
                                <li className="item_links_footer"><Link className="link_footer" href="#">Політика конфіденційності</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="box_footer_under_content">
                        <div className="decoration_line_footer"></div>
                        <p className="text_under_content_footer">© Eats Easy 2025</p>
                    </div>
                </div>
            </footer>
            <div className="footer_navigation_menu">
                <Link
                    href={"/"}
                    className={`box_link_item_footer_navigation_menu ${activeMenuItem === "/" ? "active" : ""}`}
                    onClick={() => setActiveMenuItem("/")}
                >
                    <div className="box_icon_item_footer">
                        <EmptyHomeSvg className="icon_item_footer_navigation_menu icon_home_empty"/>
                        <HomeSvg className="icon_item_footer_navigation_menu icon_home_filled"/>
                    </div>
                    <p className="text_item_footer_navigation_menu">Головна</p>
                </Link>
                <Link
                    href="#"
                    className={`box_link_item_footer_navigation_menu ${activeMenuItem === "search" ? "active" : ""}`}
                    onClick={() => setActiveMenuItem("search")}
                >
                    <SearchSvg className="icon_item_footer_navigation_menu" />
                    <p className="text_item_footer_navigation_menu">Пошук</p>
                </Link>
                <button
                    className={`box_link_item_footer_navigation_menu ${activeMenuItem === "cart" ? "active" : ""}`}
                    onClick={toggleCart}
                >
                    <div className="box_icon_item_footer">
                        <span className="number_product_add_cart_footer">0</span>
                        <BasketSvg className="icon_item_footer_navigation_menu" />
                    </div>
                    <p className="text_item_footer_navigation_menu">Кошик</p>
                </button>
                <button
                    className={`box_link_item_footer_navigation_menu ${activeMenuItem === "profile" ? "active" : ""}`}
                    onClick={handleAuth}
                >
                    <ProfileSvg className="icon_item_footer_navigation_menu" />
                    <p className="text_item_footer_navigation_menu">Профіль</p>
                </button>
            </div>

            <CartModal cartOpen={cartOpen} toggleCart={toggleCart}/>
            <RegistrationModal isOpen={modalOpen} onClose={toggleModal} />
        </>
    );
};