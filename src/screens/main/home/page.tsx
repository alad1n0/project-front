"use client";

import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowSvg,
    BurgerKing, ColumSvg, FilaProduct,
    MainImage,
    RestaurantPizza, RowSvg,
    SearchSvg,
} from "@/assets";
import {popularCategories} from "@/lib/main/popularCategories";
import RestaurantList from "@/components/main/restaurant/RestaurantList";
import ProductList from "@/components/main/product/ProductList";

const restaurants = [
    {id: 1, name: "DonatelloPizza", image: RestaurantPizza, rating: 90, deliveryFee: "250 грн.", deliveryTime: "20 хв"},
    {id: 2, name: "Burger King", image: BurgerKing, rating: 85, deliveryFee: "Безкоштовна", deliveryTime: "25 хв"},
];

const products = [
    { id: 1, name: "Вершковий з креветкою", weight: 250, price: 178, image: FilaProduct, description: "Рис, норі, крем-сир, креветка" },
];

const categories = ["Суші", "Сети", "Піца", "Напої", "Фрі меню"];

const Home: React.FC = () => {
    const [selectedRestaurants, setSelectedRestaurants] = useState<Record<number, boolean>>({});
    const [selectedProducts, setSelectedProducts] = useState<Record<number, boolean>>({});
    const [activeTab, setActiveTab] = useState(categories[0]);
    const [isFoodOpen, setIsFoodOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState("За популярністю");
    const [layout, setLayout] = useState("rows");

    const foodOptions = ["Від дешевших до дорогих", "Від дорогих до дешевших", "За популярністю"];

    const toggleDropdown = () => {
        setIsFoodOpen(!isFoodOpen);
    };

    const toggleFavoriteRestaurant = (id: number) => {
        setSelectedRestaurants((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleFavoriteProduct = (id: number) => {
        setSelectedProducts((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleSelect = (option: string) => {
        setSelectedFood(option);
        setIsFoodOpen(false);
    };

    return (
        <div className="main_page">
            <div className="content_main">
                <Image className="main_image" src={MainImage} alt=""/>
                <div className="main_container_section_top">
                    <div className="main_text_section_top">
                        <h1 className="main_text_title">Сервіс доставки їжі EatsEasy.</h1>
                        <p className="main_text">
                            Обирайте найкращі ресторани у вашому місті та насолоджуйтеся вишуканими стравами, не
                            виходячи з дому. Високоякісне обслуговування та швидка доставка зроблять кожне замовлення
                            справжнім святом для вашого смаку. Замовляйте легко, зручно та швидко!
                        </p>
                    </div>
                    <div className="search_container_section_top">
                        <label className="label_search_section_top" htmlFor="search_home_page">
                            <SearchSvg className="icon_search_section_top"/>
                            <input type="text" id="search_home_page" className="search_input_section_top"
                                   placeholder="Страви, заклади"/>
                        </label>
                        <button className="search_button_section_top" type="button">Знайти</button>
                    </div>
                </div>
            </div>

            <div className="popular_categories">
                <div className="popular_categories_title">
                    <h2>Популярні категорії</h2>
                    <Link className="view_all_button_link" href="#">
                        <p className="view_all_button_text">Показати все</p>
                        <ArrowSvg className="icon_arrow_view_all"/>
                    </Link>
                </div>
                <div className="popular_categories_container">
                    {popularCategories.map((category, index) => (
                        <div key={index} className="popular_categories_block">
                            <category.icon/>
                            <p>{category.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="restaurant_title_container">
                <div className="box_top_section_restaurant">
                    <h2>Заклади, які вам можуть сподобатись</h2>
                    <Link className="view_all_button_link" href="#">
                        <p className="view_all_button_text">Показати все</p>
                        <ArrowSvg className="icon_arrow_view_all"/>
                    </Link>
                </div>
            </div>

            <RestaurantList restaurants={restaurants} selectedRestaurants={selectedRestaurants} toggleFavorite={toggleFavoriteRestaurant}/>

            <div className="section_what_to_order">
                <h2 className="title_section_product_home_page">Що замовити у EatsEasy?</h2>

                <ul className="list_tabs_foods">
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

                <div className="container_filter">
                    <div className="box_top_filter">
                        <div className="box_select">
                            <div
                                className={`box_top_select ${isFoodOpen ? "open" : ""}`}
                                onClick={() => toggleDropdown()}
                            >
                                <p className="text_selected">{selectedFood}</p>
                                <ArrowSvg className="icon_arrow_select"/>
                            </div>
                            <ul className={`dropdown_list ${isFoodOpen ? "open" : ""}`}>
                                {foodOptions.map((option) => (
                                    <li
                                        key={option}
                                        className={`item_option_select ${selectedFood === option ? "active" : ""}`}
                                        onClick={() => handleSelect(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="box_markup_filter">
                            <button
                                type="button"
                                className={`btn_markup_filter ${layout === "rows" ? "active" : ""}`}
                                onClick={() => setLayout("rows")}
                            >
                                <RowSvg className="icon_markup_filter" />
                            </button>
                            <button
                                type="button"
                                className={`btn_markup_filter ${layout === "columns" ? "active" : ""}`}
                                onClick={() => setLayout("columns")}
                            >
                                <ColumSvg className="icon_markup_filter" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`container_products ${layout}`}>
                    <ProductList products={products} selectedProduct={selectedProducts} toggleFavorite={toggleFavoriteProduct}/>
                </div>

                <a href="#" className="link_more_products">Показати ще</a>
            </div>

            <div className="partner_container">
            <div className="partner_container_title">
                    <h2>EatsEasy для бізнесу!</h2>
                </div>
                <div className="partner_container_content">
                    <div className="partner_container_image">
                        <div className="partner_info">
                            <h4>EatsEasy для бізнесу!</h4>
                            <p>Замовляйте смачні сніданки чи обіди, їжу для корпоративів в офісі. Ваші улюблені страви
                                ми доставимо якнайшвидше. </p>
                            <button className="search_button_section_top" type="button">Спробувати</button>
                        </div>
                    </div>
                    <div className="partner_info_adaptive">
                        <h4>EatsEasy для бізнесу!</h4>
                        <p>Замовляйте смачні сніданки чи обіди, їжу для корпоративів в офісі. Ваші улюблені страви ми
                            доставимо якнайшвидше. </p>
                        <button className="search_button_section_top" type="button">Спробувати</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;