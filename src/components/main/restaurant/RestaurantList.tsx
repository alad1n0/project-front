"use client";

import React from "react";
import Image, {StaticImageData} from "next/image";
import { DeliverySvg, HeartDislikeSvg, HeartLikeSvg, StarsSvg } from "@/assets";
import { cn } from "@/helpers/cn";
import Link from "next/link";

interface Restaurant {
    id: number;
    name: string;
    image: StaticImageData;
    rating: number;
    deliveryFee: string;
    deliveryTime: string;
}

interface RestaurantListProps {
    restaurants: Restaurant[];
    selectedRestaurants: Record<number, boolean>;
    toggleFavorite: (id: number) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, selectedRestaurants, toggleFavorite }) => {
    return (
        <div className="container_custom section_restaurant">
            <div className="container_cards_restaurant">
                {restaurants.map((restaurant) => {

                    const isSelected = selectedRestaurants[restaurant.id] || false;

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
                                    {isSelected ? <HeartLikeSvg className="btn_add_wishlist_svg" /> : <HeartDislikeSvg className="btn_add_wishlist_svg" />}
                                </button>
                                <Link href={`/restaurant/${restaurant.id}`}><Image className="photo_card_restaurant" src={restaurant.image} alt={restaurant.name} /></Link>
                                <div className="box_rating_card_restaurant">
                                    <StarsSvg className="icon_rating_card_restaurant" />
                                    <p className="interest_card_restaurant">{restaurant.rating}</p>
                                </div>
                            </div>
                            <div className="box_bottom_content_card_restaurant">
                                <Link href={`/restaurant/${restaurant.id}`}><h3 className="name_card_restaurant">{restaurant.name}</h3></Link>
                                <div className="box_delivery_time_card_restaurant">
                                    <div className="box_icon_delivery">
                                        <DeliverySvg className="icon_delivery_card_restaurant" />
                                        <p className="text_delivery_card_restaurant">{restaurant.deliveryFee}</p>
                                    </div>
                                    <p className="time_delivery_card_restaurant">{restaurant.deliveryTime}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RestaurantList;