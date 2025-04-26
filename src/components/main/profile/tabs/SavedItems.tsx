"use client"

import React, {useEffect, useState} from "react";
import RestaurantList from "@/components/main/restaurant/RestaurantList";
import {Restaurant} from "@/types/restaurant/interfaces";
import {useGetSavedRestaurantList} from "@/components/main/profile/hooks/useGetSavedRestaurantList";
import {useActionsFavorite} from "@/screens/main/hooks/favorite/useActionsFavorite";
import {Products} from "@/types/product/interface";
import ProductList from "@/components/main/product/ProductList";

const categories = ["Заклади", "Їжа"];

const SavedItems = () => {
    const [activeTab, setActiveTab] = useState(categories[0]);
    const [products, setProducts] = useState<Products[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const { data } = useGetSavedRestaurantList();
    const { mutate: toggleFavorite } = useActionsFavorite();

    useEffect(() => {
        if (data?.data?.data?.restaurants) {
            setRestaurants(data.data.data.restaurants);
        }
    }, [data]);

    useEffect(() => {
        if (data?.data?.data?.products) {
            setProducts(data.data.data.products);
        }
    }, [data]);

    const toggleFavoriteRestaurant = (id: string) => {
        toggleFavorite({ restaurantId: id, productId: null, type: 'restaurant' }, {
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

    const toggleFavoriteProduct = (id: string) => {
        toggleFavorite({ productId: id, restaurantId: null, type: 'product' }, {
            onSuccess: (res) => {
                if (res.data.data.isFavorite) {
                    setProducts((prev) =>
                        prev.map((product) =>
                            product.id === res.data.data.id
                                ? { ...product, isFavorite: res.data.data.isFavorite }
                                : product
                        )
                    );
                } else {
                    setProducts((prev) => prev.filter((product) => product.id !== res.data.data.id));
                }
            },
        });
    };

    return (
        <div className="container_saved_items">
            <h1>Збережене</h1>

            <div className="tabs_saved_items">
                {(restaurants.length > 0 || products.length > 0) && (
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
                )}

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
                            <ProductList
                                products={products}
                                toggleFavorite={toggleFavoriteProduct}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedItems;