"use client"

import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    ArrowSvg,
    BackArrowSvg,
    ClockSvg,
    DeliverySvg,
    SendSvg,
    StarsSvg,
    TelePhoneSvg
} from "@/assets";
import { useParams } from "next/navigation";
import {OneRestaurant} from "@/types/restaurant/interfaces";
import {useGetRestaurant} from "@/screens/main/hooks/useGetRestaurant";
import Link from "next/link";

export default function RestaurantDetails() {
    const { id } = useParams();

    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const listRef = useRef<HTMLUListElement | null>(null);

    const [restaurant, setRestaurant] = useState<OneRestaurant | null>(null);

    const { data } = useGetRestaurant(id as string);

    useEffect(() => {
        if (data?.data?.data) {
            console.log(data.data.data);
            setRestaurant(data.data.data);
        }
    }, [data]);

    useLayoutEffect(() => {
        const listRefCurrent = listRef.current;
        const checkScrollPosition = () => {
            if (listRefCurrent) {
                const el = listRefCurrent;
                setShowLeftArrow(el.scrollLeft > 0);
                setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth);
            }
        };

        checkScrollPosition();
        listRefCurrent?.addEventListener("scroll", checkScrollPosition);
        window.addEventListener("resize", checkScrollPosition);

        return () => {
            listRefCurrent?.removeEventListener("scroll", checkScrollPosition);
            window.removeEventListener("resize", checkScrollPosition);
        };
    }, [listRef]);

    return (
        <div className="container_block_restaurant_page">
            <div className="section_top_restaurant_page">
                <div className="container_custom_top_restaurant_page">
                    <div className="container_links_img_top_restaurant_page">
                        <Link href={"/restaurant"} type="button" className="links_top_restaurant_page link_top_restaurant_page_go_back link_top_restaurant_page_go_back_restaurant_page">
                            <BackArrowSvg className="icon_top_restaurant_page" />
                        </Link>
                        <button type="button" id="copyButton" className="links_top_restaurant_page link_top_restaurant_page_info_page">
                            <SendSvg className="icon_top_restaurant_page" />
                        </button>
                        <div className="box_img_top_restaurant_page">
                            <img className="img_top_restaurant_page" src={restaurant?.banner} alt={restaurant?.name}/>
                        </div>
                    </div>
                    <div className="container_info_search_restaurant_page">
                        <div className="container_photo_name_phone">
                            <img className="logo_restaurant_page" src={restaurant?.logo} alt={restaurant?.name}/>
                            <div className="box_text_name_phone">
                                <div className="box_name_btn_information">
                                    <h2 className="name_restaurant_page">{restaurant?.name}</h2>
                                </div>
                                <a href="tel:0800204050" className="link_phone_restaurant_page">
                                    <TelePhoneSvg className="icon_phone_restaurant_page" />
                                    <span className="text_number_phone_restaurant_page">0800 20 40 50</span>
                                </a>
                            </div>
                        </div>
                        <div className="container_text_info_delivery">
                            <div className="container_block_info_restaurant_page">
                                <div className="box_item_block_info_restaurant_page">
                                    <div className="box_icon_item_block_info_restaurant_page">
                                        <StarsSvg className="icon_item_block_info_restaurant_page"/>
                                    </div>
                                    <p className="text_item_block_info_restaurant_page">{restaurant?.rating} %</p>
                                </div>

                                <div className="box_item_block_info_restaurant_page">
                                    <div className="box_icon_item_block_info_restaurant_page">
                                        <DeliverySvg className="icon_item_block_info_restaurant_page"/>
                                    </div>
                                    <p className="text_item_block_info_restaurant_page">{restaurant?.deliveryPrice} грн</p>
                                </div>

                                <div className="box_item_block_info_restaurant_page">
                                    <div className="box_icon_item_block_info_restaurant_page">
                                        <ClockSvg className="icon_item_block_info_restaurant_page"/>
                                    </div>
                                    <p className="text_item_block_info_restaurant_page">{restaurant?.cookingTime} хв</p>
                                </div>
                            </div>
                            {/*<div className="box_content_close_restaurant">*/}
                            {/*    <RestCloseSvg className="icon_close_restaurant_page"/>*/}
                            {/*    <p className="text_close_restaurant_page">Зачинено до 10:00</p>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container_tabs_restaurant_page">
                <div className="list_tabs_wrapper" style={{ position: 'relative' }}>
                    <ul className={`list_tabs_foods ${showLeftArrow || showRightArrow ? "scrollable" : ""}`} ref={listRef} >
                        {["Акції", "Піца", "Фрі меню", "Напої", "Суші", "Суші-бургери", "Салати", "Десерти"].map((tab, index) => (
                            <li key={index} className="item_tabs_food">
                                <a href="#">{tab}</a>
                            </li>
                        ))}
                    </ul>

                    {showLeftArrow && (
                        <div
                            className="arrow-left"
                            onClick={() => listRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
                        >
                            <ArrowSvg className="icon_arrow_right" />
                        </div>
                    )}

                    {showRightArrow && (
                        <div
                            className="arrow-right"
                            onClick={() => listRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
                        >
                            <ArrowSvg className="icon_arrow_right" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}