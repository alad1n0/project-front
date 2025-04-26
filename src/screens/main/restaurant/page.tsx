"use client"

import {useGetRestaurantList} from "@/screens/main/hooks/restaurant/useGetRestaurantList";
import RegistrationModal from "@/components/header/modal/RegistrationModal";
import {useActionsFavorite} from "@/screens/main/hooks/favorite/useActionsFavorite";
import RestaurantList from "@/components/main/restaurant/RestaurantList";
import type { Restaurant } from "@/types/restaurant/interfaces";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/provider/AuthProvider";
import {BackArrowSvg} from "@/assets";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useGetRestaurantCategory} from "@/screens/main/hooks/restaurant-category/useGetRestaurantCategory";
import SortSelect from "@/components/ui/select/SortSelect";
import FoodSelect from "@/components/ui/select/FoodSelect";

export default function Restaurant() {
    const [isFoodOpen, setIsFoodOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState("Тип закладу");
    const [selectedSort, setSelectedSort] = useState("Сортувати за");
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const sortOptions = ["За популярністю", "Безкоштовна доставка"];

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const { data: foodOptionsData } = useGetRestaurantCategory();
    const foodOptions = [{ id: null, name: "Всі" }, ...(foodOptionsData?.data?.data ?? [])];
    const selectedCategoryId = foodOptions.find((item) => item.name === selectedFood)?.id ?? null;

    const { data } = useGetRestaurantList({
        page,
        limit: 8,
        categoryId: selectedFood !== "Тип закладу" && selectedFood !== "Всі" ? selectedCategoryId : undefined,
        isFreeDelivery: selectedSort === "Безкоштовна доставка" ? true : undefined,
        sortByPopularity: selectedSort === "За популярністю" ? true : undefined,
    });

    const { mutate: toggleFavorite } = useActionsFavorite();

    useEffect(() => {
        setPage(1);
        setRestaurants([]);
    }, [selectedFood, selectedSort]);

    useEffect(() => {
        if (data?.data?.data?.restaurants) {
            const newRestaurants = data.data.data.restaurants;

            setRestaurants(newRestaurants);

            setHasMore(data.data.data.meta.currentPage < data.data.data.meta.totalPages);
        }
    }, [data]);

    const loadMoreRestaurants = () => {
        if (hasMore) {
            setPage((prev) => prev + 1);
        }
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

        toggleFavorite({ restaurantId: id, productId: null, type: 'restaurant' }, {
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
        if (type === "food") {
            if (option === "Всі") {
                setSelectedFood("Всі");
            } else {
                setSelectedFood((prev) => (prev === option ? "Всі" : option));
            }
        } else {
            setSelectedSort((prev) => (prev === option ? "Сортувати за" : option));
        }

        setIsFoodOpen(false);
        setIsSortOpen(false);
    };

    return (
        <>
            <div className="box_top_restaurant_manufacturer_page">
                <div className="box_top_restaurant_title">
                    <Link href="/" type="button" className="links_top_restaurant_page">
                        <BackArrowSvg className="icon_top_restaurant_page" />
                    </Link>
                    <h1 className="title_restaurant_manufacturer_page">Заклади</h1>
                </div>

                <div className="box_top_section_restaurant_manufacturer_page">
                    <div className="container_select">
                        <FoodSelect
                            selectedFood={selectedFood}
                            isOpen={isFoodOpen}
                            toggleDropdown={() => toggleDropdown("food")}
                            options={foodOptions}
                            onSelect={(option) => handleSelect(option, "food")}
                        />

                        <SortSelect
                            selectedSort={selectedSort}
                            isOpen={isSortOpen}
                            toggleDropdown={() => toggleDropdown("sort")}
                            options={sortOptions}
                            onSelect={(option) => handleSelect(option, "sort")}
                        />
                    </div>
                </div>
            </div>
            <div className="restaurant_manufacturer_page">
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