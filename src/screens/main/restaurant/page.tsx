"use client"

import {ArrowSvg, BackArrowSvg, BurgerKing, RestaurantPizza} from "@/assets";
import React, {useState} from "react";
import RestaurantList from "@/components/main/restaurant/RestaurantList";
import {useRouter} from "next/navigation";

const restaurants = [
    {id: 1, name: "DonatelloPizza", image: RestaurantPizza, rating: 90, deliveryFee: "250 грн.", deliveryTime: "20 хв"},
    {id: 2, name: "Burger King", image: BurgerKing, rating: 85, deliveryFee: "Безкоштовна", deliveryTime: "25 хв"},
];

export default function Restaurant() {
    const [isFoodOpen, setIsFoodOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState("Тип їжі");
    const [selectedSort, setSelectedSort] = useState("Сортувати за");
    const [selectedRestaurants, setSelectedRestaurants] = useState<Record<number, boolean>>({});
    const router = useRouter();

    const foodOptions = ["Всі", "Суші", "Бургери", "Піца", "Шаурма"];
    const sortOptions = ["За популярністю", "Поруч зі мною", "Безкоштовна доставка"];

    const toggleDropdown = (type: "food" | "sort") => {
        if (type === "food") {
            setIsFoodOpen(!isFoodOpen);
            setIsSortOpen(false);
        } else {
            setIsSortOpen(!isSortOpen);
            setIsFoodOpen(false);
        }
    };

    const toggleFavorite = (id: number) => {
        setSelectedRestaurants((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleSelect = (option: string, type: "food" | "sort") => {
        if (type === "food") setSelectedFood(option);
        else setSelectedSort(option);

        setIsFoodOpen(false);
        setIsSortOpen(false);
    };

    const handleBackClick = () => {
        router.back();
    }

    return (
        <div className="restaurant_manufacturer_page">
            <div className="box_top_restaurant_title">
                <button type="button" onClick={handleBackClick} className="links_top_restaurant_page">
                    <BackArrowSvg className="icon_top_restaurant_page" />
                </button>
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

            <RestaurantList restaurants={restaurants} selectedRestaurants={selectedRestaurants} toggleFavorite={toggleFavorite}/>
        </div>
    );
}