"use client"

import Image from "next/image";
import React, {useCallback, useRef} from "react";
import {
    BackArrowSvg,
    ClockSvg,
    DeliverySvg,
    LogoRest,
    RestaurantPizza, RestCloseSvg,
    SendSvg,
    StarsSvg,
    TelePhoneSvg
} from "@/assets";

export default function RestaurantDetails() {
    const scrollContainerRef = useRef<HTMLUListElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!scrollContainerRef.current) return;
        isDragging.current = true;
        startX.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        requestAnimationFrame(() => {
            scrollContainerRef.current!.scrollLeft = scrollLeft.current - walk;
        });
    }, []);

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        requestAnimationFrame(() => {
            scrollContainerRef.current!.scrollLeft = scrollLeft.current - walk;
        });
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
    };

    return (
        <div className="container_block_restaurant_page">
            <div className="section_top_restaurant_page">
                <div className="container_custom_top_restaurant_page">
                    <div className="container_links_img_top_restaurant_page">
                        <button type="button" className="links_top_restaurant_page link_top_restaurant_page_go_back link_top_restaurant_page_go_back_restaurant_page ">
                            <BackArrowSvg className="icon_top_restaurant_page" />
                        </button>
                        <button type="button" id="copyButton" className="links_top_restaurant_page link_top_restaurant_page_info_page">
                            <SendSvg className="icon_top_restaurant_page" />
                        </button>
                        <div className="box_img_top_restaurant_page">
                            <Image className="img_top_restaurant_page" src={RestaurantPizza} alt=""/>
                        </div>
                    </div>
                    <div className="container_info_search_restaurant_page">
                        <div className="container_photo_name_phone">
                            <Image className="logo_restaurant_page" src={LogoRest} alt=""/>
                            <div className="box_text_name_phone">
                                <div className="box_name_btn_information">
                                    <h2 className="name_restaurant_page">Sushi Go</h2>
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
                                    <p className="text_item_block_info_restaurant_page">99 %</p>
                                </div>

                                <div className="box_item_block_info_restaurant_page">
                                    <div className="box_icon_item_block_info_restaurant_page">
                                        <DeliverySvg className="icon_item_block_info_restaurant_page"/>
                                    </div>
                                    <p className="text_item_block_info_restaurant_page">10 грн</p>
                                </div>

                                <div className="box_item_block_info_restaurant_page">
                                    <div className="box_icon_item_block_info_restaurant_page">
                                        <ClockSvg className="icon_item_block_info_restaurant_page"/>
                                    </div>
                                    <p className="text_item_block_info_restaurant_page">59 хв</p>
                                </div>
                            </div>
                            <div className="box_content_close_restaurant">
                                <RestCloseSvg className="icon_close_restaurant_page"/>
                                <p className="text_close_restaurant_page">Зачинено до 10:00 </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container_tabs_restaurant_page">
                <ul
                    className="list_tabs_foods"
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseUp}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {["Акції", "Піца", "Фрі меню", "Напої", "Суші", "Суші-бургери", "Салати", "Десерти"].map((tab, index) => (
                        <li key={index} className="item_tabs_food">
                            <a href="#">{tab}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pading"></div>
        </div>
    );
}