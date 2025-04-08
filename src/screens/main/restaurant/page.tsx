"use client"

import {useGetRestaurantList} from "@/screens/main/hooks/useGetRestaurantList";
import RegistrationModal from "@/components/header/modal/RegistrationModal";
import {useActionsFavorite} from "@/screens/main/hooks/useActionsFavorite";
import RestaurantList from "@/components/main/restaurant/RestaurantList";
import type { Restaurant } from "@/types/restaurant/interfaces";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/provider/AuthProvider";
import {ArrowSvg, BackArrowSvg} from "@/assets";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Restaurant() {
    const [isFoodOpen, setIsFoodOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState("Тип їжі");
    const [selectedSort, setSelectedSort] = useState("Сортувати за");
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const foodOptions = ["Всі", "Суші", "Бургери", "Піца", "Шаурма"];
    const sortOptions = ["За популярністю", "Поруч зі мною", "Безкоштовна доставка"];

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const { data } = useGetRestaurantList({ page, limit: 8 });
    const { mutate: toggleFavorite } = useActionsFavorite();

    useEffect(() => {
        if (data?.data?.data?.restaurants) {
            const newRestaurants = data.data.data.restaurants;

            setRestaurants((prev) => {
                const uniqueNewRestaurants = newRestaurants.filter((newRestaurant: Restaurant) =>
                    !prev.some((existingRestaurant) => existingRestaurant.id === newRestaurant.id)
                );
                return [...prev, ...uniqueNewRestaurants];
            });

            setHasMore(newRestaurants.length === 8);
        }
    }, [data]);

    const loadMoreRestaurants = () => {
        setPage((prev) => prev + 1);
    };

    const toggleDropdown = (type: "food" | "sort") => {
        if (type === "food") {
            setIsFoodOpen(!isFoodOpen);
            setIsSortOpen(false);
        } else {
            setIsSortOpen(!isSortOpen);
            setIsFoodOpen(false);
        }
    };

    const toggleModal = () => {
        if (!isAuthenticated) {
            setModalOpen(!modalOpen);
            return;
        }

        router.push("/profile");
    };

    const toggleFavoriteRestaurant = (id: string) => {
        if (!isAuthenticated) {
            setModalOpen(true);
            return;
        }

        toggleFavorite({ restaurantId: id }, {
            onSuccess: (res) => {
                setRestaurants((prev) =>
                    prev.map((restaurant) =>
                        restaurant.id === res.data.data.id
                            ? { ...restaurant, isFavorite: res.data.data.isFavorite }
                            : restaurant
                    )
                );
            },
        });
    };

    const handleSelect = (option: string, type: "food" | "sort") => {
        if (type === "food") setSelectedFood(option);
        else setSelectedSort(option);

        setIsFoodOpen(false);
        setIsSortOpen(false);
    };

    return (
        <>
            <div className="restaurant_manufacturer_page">
                <div className="box_top_restaurant_title">
                    <Link href="/" type="button" className="links_top_restaurant_page">
                        <BackArrowSvg className="icon_top_restaurant_page" />
                    </Link>
                    <h1 className="title_restaurant_manufacturer_page">Заклади</h1>
                </div>

                <div className="box_top_section_restaurant_manufacturer_page">
                    <div className="container_select">
                        <div className="box_select">
                            <div
                                className={`box_top_select ${isFoodOpen ? "open" : ""}`}
                                onClick={() => toggleDropdown("food")}
                            >
                                <p className="text_selected">{selectedFood}</p>
                                <ArrowSvg className="icon_arrow_select" />
                            </div>
                            <ul className={`dropdown_list ${isFoodOpen ? "open" : ""}`}>
                                {foodOptions.map((option) => (
                                    <li
                                        key={option}
                                        className={`item_option_select ${selectedFood === option ? "active" : ""}`}
                                        onClick={() => handleSelect(option, "food")}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="box_select">
                            <div
                                className={`box_top_select ${isSortOpen ? "open" : ""}`}
                                onClick={() => toggleDropdown("sort")}
                            >
                                <p className="text_selected">{selectedSort}</p>
                                <ArrowSvg className="icon_arrow_select" />
                            </div>
                            <ul className={`dropdown_list ${isSortOpen ? "open" : ""}`}>
                                {sortOptions.map((option) => (
                                    <li
                                        key={option}
                                        className={`item_option_select ${selectedSort === option ? "active" : ""}`}
                                        onClick={() => handleSelect(option, "sort")}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="container_custom section_restaurant">
                    <div className="container_cards_restaurant">
                        <RestaurantList
                            restaurants={restaurants}
                            toggleFavorite={toggleFavoriteRestaurant}
                        />
                    </div>
                    {hasMore && (
                        <button onClick={loadMoreRestaurants} className="link_more_products">
                            Показати ще
                        </button>
                    )}
                </div>
            </div>

            <RegistrationModal isOpen={modalOpen} onClose={toggleModal} />
        </>
    );
}