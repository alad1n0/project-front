"use client";

import React from "react";
import {DeliverySvg, HeartDislikeSvg, HeartLikeSvg, StarsSvg} from "@/assets";
import {RestaurantListProps} from "@/types/restaurant/interfaces";
import {cn} from "@/helpers/cn";
import Link from "next/link";

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, toggleFavorite}) => {
    return (
        <>
            {restaurants.map((restaurant) => {
                const isSelected = restaurant.isFavorite;

                return (
                    <div key={restaurant.id} className="link_item_card_restaurant">
                        <div className="box_top_item_card_restaurant">
                            <button
                                className={cn("btn_add_wishlist", isSelected && "selected")}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(restaurant.id);
                                }}
                            >
                                {isSelected ? (
                                    <HeartLikeSvg className="btn_add_wishlist_svg" />
                                ) : (
                                    <HeartDislikeSvg className="btn_add_wishlist_svg" />
                                )}
                            </button>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <Link href={`/restaurant/${restaurant.id}`}><img className="photo_card_restaurant" src={restaurant.banner} alt={restaurant.name}/></Link>
                            <div className="box_rating_card_restaurant">
                                <StarsSvg className="icon_rating_card_restaurant"/>
                                <p className="interest_card_restaurant">{restaurant.rating}</p>
                            </div>
                        </div>
                        <div className="box_bottom_content_card_restaurant">
                            <Link href={`/restaurant/${restaurant.id}`}><h3
                                className="name_card_restaurant">{restaurant.name}</h3></Link>
                            <div className="box_delivery_time_card_restaurant">
                                <div className="box_icon_delivery">
                                    <DeliverySvg className="icon_delivery_card_restaurant"/>
                                    <p className="text_delivery_card_restaurant">{restaurant.deliveryPrice} грн.</p>
                                </div>
                                <p className="time_delivery_card_restaurant">{restaurant.cookingTime} хв.</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default RestaurantList;