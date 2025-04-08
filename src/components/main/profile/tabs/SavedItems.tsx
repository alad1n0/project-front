"use client"

import React, {useEffect, useState} from "react";
import RestaurantList from "@/components/main/restaurant/RestaurantList";
import {Restaurant} from "@/types/restaurant/interfaces";
import {useGetSavedRestaurantList} from "@/components/main/profile/hooks/useGetSavedRestaurantList";
import {useActionsFavorite} from "@/screens/main/hooks/useActionsFavorite";

const categories = ["Заклади", "Їжа"];

const SavedItems = () => {
    const [activeTab, setActiveTab] = useState(categories[0]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const { data } = useGetSavedRestaurantList();
    const { mutate: toggleFavorite } = useActionsFavorite();

    useEffect(() => {
        if (data?.data?.data) {
            console.log(data.data.data);
            setRestaurants(data.data.data);
        }
    }, [data]);

    const toggleFavoriteRestaurant = (id: string) => {
        toggleFavorite({ restaurantId: id }, {
            onSuccess: (res) => {
                if (res.data.data.isFavorite) {
                    setRestaurants((prev) =>
                        prev.map((restaurant) =>
                            restaurant.id === res.data.data.id
                                ? { ...restaurant, isFavorite: res.data.data.isFavorite }
                                : restaurant
                        )
                    );
                } else {
                    setRestaurants((prev) => prev.filter((restaurant) => restaurant.id !== res.data.data.id));
                }
            },
        });
    };

    return (
        <div className="container_saved_items">
            <h1>Збережене</h1>

            <div className="tabs_saved_items">
                <ul className="list_tabs_saved">
                    {categories.map((category) => (
                        <li
                            key={category}
                            className={`item_tabs_food ${activeTab === category ? "active" : ""}`}
                            onClick={() => setActiveTab(category)}
                        >
                            <a>{category}</a>
                        </li>
                    ))}
                </ul>

                {activeTab === "Заклади" && (
                    <div className="section_restaurant">
                        <div className="container_cards_saved_restaurant">
                            <RestaurantList
                                restaurants={restaurants}
                                toggleFavorite={toggleFavoriteRestaurant}
                            />
                        </div>
                    </div>
                )}

                {activeTab === "Їжа" && (
                    <div className="container_custom section_products">
                        <div className="container_cards_products">
                            {/* <ProductList
                            products={products}
                            toggleFavorite={toggleFavoriteProduct}
                        /> */}
                            <p>Тут будуть продукти</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedItems;