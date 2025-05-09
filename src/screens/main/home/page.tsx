"use client";

import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {ArrowSvg, ColumSvg, MainImage, RowSvg, SearchSvg,} from "@/assets";
import ProductList from "@/components/main/product/ProductList";
import RestaurantList from "@/components/main/restaurant/RestaurantList";
import {useGetTopRestaurant} from "@/screens/main/hooks/restaurant/useGetTopRestaurant";
import {useActionsFavorite} from "@/screens/main/hooks/favorite/useActionsFavorite";
import RegistrationModal from "@/components/header/modal/RegistrationModal";
import {useAuth} from "@/provider/AuthProvider";
import {useRouter} from "next/navigation";
import {Restaurant} from "@/types/restaurant/interfaces";
import {useGetTopRestaurantCategory} from "@/screens/main/hooks/restaurant-category/useGetTopRestaurantCategory";
import {RestaurantCategory} from "@/types/restaurant-category/interface";
import {useProductRestaurantCategory} from "@/screens/main/hooks/product/useProductRestaurantCategory";
import {CategoryProduct, ProductParams, Products} from "@/types/product/interface";
import {useGetProductRestaurantList} from "@/screens/main/hooks/product/useGetProductRestaurantList";
import SubcategoryTabs from "@/components/ui/tabs/Tabs";
import SizeTabs from "@/components/ui/tabs/SizeTabs";
import {useBasket} from "@/provider/BasketProvider";
import { motion } from "framer-motion";

const Home: React.FC = () => {
    const [products, setProducts] = useState<Products[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [restaurantCategory, setRestaurantCategory] = useState<RestaurantCategory[]>([]);
    const [isFoodOpen, setIsFoodOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState("За популярністю");
    const [layout, setLayout] = useState("rows");
    const [modalOpen, setModalOpen] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    const [page, setPage] = useState(1);

    const listRef = useRef<HTMLUListElement | null>(null);

    const { lastRefresh } = useBasket();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const [productParams, setProductParams] = useState<ProductParams>({
        categoryId: null,
        subcategoryId: null,
        size: null,
        limit: 6,
        page: 1
    });

    const foodOptions = ["Від дешевших до дорогих", "Від дорогих до дешевших", "За популярністю"];

    const { data } = useGetTopRestaurant();
    const { mutate: toggleFavorite } = useActionsFavorite();
    const { data: topRestaurantCategory } = useGetTopRestaurantCategory();
    const { data: productCategory } = useProductRestaurantCategory("27d6a336-5011-4408-8c20-015a3d8801cd")
    const { data: productList, refetch } = useGetProductRestaurantList("27d6a336-5011-4408-8c20-015a3d8801cd", productParams);

    const hasTabs = productCategory?.data?.data.find(
        (cat: CategoryProduct) => cat.name === activeTab
    )?.subcategories?.length > 0;

    useEffect(() => {
        refetch();
    }, [lastRefresh, refetch]);

    useEffect(() => {
        const categories: CategoryProduct[] = productCategory?.data?.data || [];
        const selectedCategory = categories.find(cat => cat.name === activeTab);

        if (selectedCategory) {
            setProducts([]);
            setPage(1);
            setProductParams(prev => ({
                ...prev,
                categoryId: selectedCategory.id,
                subcategoryId: null,
                page: 1,
            }));
        }
    }, [activeTab, productCategory]);

    useEffect(() => {
        if (productParams.categoryId || productParams.subcategoryId) {
            refetch();
        }
    }, [productParams.categoryId, productParams.subcategoryId, productParams.size, productParams.page]);

    useEffect(() => {
        if (productCategory?.data?.data?.length > 0) {
            setActiveTab(productCategory?.data.data[0].name);
        }
    }, [productCategory]);

    useEffect(() => {
        if (data?.data?.data) {
            setRestaurants(data.data.data);
        }
    }, [data]);

    useEffect(() => {
        if (productList?.data?.data.products) {
            const newProducts = productList.data.data.products;
            setProducts(prev => {
                const existingIds = new Set(prev.map(p => p.id));
                const filtered = newProducts.filter((p: Products) => !existingIds.has(p.id));
                return page === 1 ? newProducts : [...prev, ...filtered];
            });
        }
    }, [productList]);

    useEffect(() => {
        if (topRestaurantCategory?.data?.data) {
            setRestaurantCategory(topRestaurantCategory.data.data);
        }
    }, [topRestaurantCategory]);

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

    const toggleDropdown = () => {
        setIsFoodOpen(!isFoodOpen);
    };

    const toggleModal = () => {
        if (!isAuthenticated) {
            setModalOpen(!modalOpen);
            return;
        }

        router.push("/profile");
    };

    const toggleFavoriteProduct = (id: string) => {
        if (!isAuthenticated) {
            setModalOpen(true);
            return;
        }

        toggleFavorite({ productId: id, restaurantId: null, type: 'product' }, {
            onSuccess: (res) => {
                setProducts((prev) =>
                    prev.map((product) =>
                        product.id === res.data.data.id
                            ? { ...product, isFavorite: res.data.data.isFavorite }
                            : product
                    )
                );
            },
        });
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

    const handleSelect = (option: string) => {
        setSelectedFood(option);
        setIsFoodOpen(false);
    };

    const handleLoadMore = () => {
        setPage(prev => {
            const nextPage = prev + 1;
            setProductParams(p => ({ ...p, page: nextPage }));
            return nextPage;
        });
    };

    return (
        <>
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
                    </div>
                    <div className="popular_categories_container">
                        {restaurantCategory.map((category, index) => (
                            <div key={index} className="popular_categories_block">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={category.imageUrl} alt={category.name} className="category_icon_svg" />
                                <p>{category.name}</p>
                            </div>
                        ))}
                    </div>

                    <Link href={'/restaurant'} className="link_more_products">Показати все</Link>
                </div>

                <div className="restaurant_title_container">
                    <div className="box_top_section_restaurant">
                        <h2>Заклади, які вам можуть сподобатись</h2>
                    </div>
                </div>

                <div className="container_custom section_restaurant">
                    <div className="container_cards_restaurant">
                        <RestaurantList
                            restaurants={restaurants}
                            toggleFavorite={toggleFavoriteRestaurant}
                        />
                    </div>
                    <Link href={'/restaurant'} className="link_more_products">Показати все</Link>
                </div>

                <div className="section_what_to_order">
                    <h2 className="title_section_product_home_page">Що замовити у EatsEasy?</h2>

                    <div className="list_tabs_wrappers" style={{ position: 'relative' }}>
                        <ul className={`list_tabs_foods ${showLeftArrow || showRightArrow ? "scrollable" : ""}`} ref={listRef}>
                            {productCategory?.data?.data.map((category: CategoryProduct) => (
                                <li
                                    key={category.id}
                                    className={`item_tabs_food ${activeTab === category.name ? "active" : ""}`}
                                    onClick={() => setActiveTab(category.name)}
                                >
                                    <a>{category.name}</a>
                                </li>
                            ))}
                        </ul>

                        {showLeftArrow && (
                            <div
                                className="arrow-left main-arrows"
                                onClick={() => listRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
                            >
                                <ArrowSvg className="icon_arrow_right" />
                            </div>
                        )}

                        {showRightArrow && (
                            <div
                                className="arrow-right main-arrows"
                                onClick={() => listRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
                            >
                                <ArrowSvg className="icon_arrow_right" />
                            </div>
                        )}
                    </div>

                    <div className="container_filter"
                         style={{
                             display: "flex",
                             justifyContent: "space-between",
                             alignItems: "flex-start",
                             gap: hasTabs ? "16px" : "0px",
                         }}
                    >
                        {hasTabs ? (
                            <SubcategoryTabs
                                subcategories={
                                    productCategory?.data?.data.find((cat: CategoryProduct) => cat.name === activeTab)?.subcategories || []
                                }
                                activeTab={productParams.subcategoryId}
                                onTabChange={(id) => {
                                    setPage(1);
                                    setProductParams(prev => ({
                                        ...prev,
                                        subcategoryId: id || null,
                                        page: 1,
                                    }));
                                }}
                            />
                        ) : (
                            <div style={{ flex: 1 }} />
                        )}

                        <div className="container_filter_bottom">
                            {productCategory?.data?.data?.find((c: CategoryProduct) => c.name === activeTab)?.sizes?.length > 0 && (
                                <SizeTabs
                                    sizes={productCategory?.data?.data?.find((c: CategoryProduct) => c.name === activeTab)?.sizes || []}
                                    activeSize={productParams.size}
                                    onSizeChange={(id) => {
                                        setPage(1);
                                        setProductParams(prev => ({
                                            ...prev,
                                            size: id || null,
                                            page: 1,
                                        }));
                                    }}
                                />
                            )}

                            <div className="box_top_filter">
                                <div className="box_select">
                                    <div
                                        className={`box_top_select ${isFoodOpen ? "open" : ""}`}
                                        onClick={() => toggleDropdown()}
                                    >
                                        <p className="text_selected">{selectedFood}</p>
                                        <ArrowSvg className="icon_arrow_select" />
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
                    </div>

                    <motion.div
                        className={`container_products ${layout}`}
                        key={products.map((p) => p.id).join(",")}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProductList
                            products={products}
                            toggleFavorite={toggleFavoriteProduct}
                        />
                    </motion.div>

                    {productList?.data?.data.meta?.totalPages > page && (
                        <div>
                            <button onClick={handleLoadMore} className="link_more_products">
                                Показати ще
                            </button>
                        </div>
                    )}
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

            <RegistrationModal isOpen={modalOpen} onClose={toggleModal} />
        </>
    );
};

export default Home;