"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowSvg, BackArrowSvg, ClockSvg, DeliverySvg, SendSvg, StarsSvg, TelePhoneSvg } from "@/assets";
import { useParams, useRouter } from "next/navigation";
import { OneRestaurant } from "@/types/restaurant/interfaces";
import { useGetRestaurant } from "@/screens/main/hooks/restaurant/useGetRestaurant";
import Link from "next/link";
import { useProductRestaurantCategory } from "@/screens/main/hooks/product/useProductRestaurantCategory";
import { CategoryProduct, OneProduct } from "@/types/product/interface";
import SubcategoryTabs from "@/components/ui/tabs/Tabs";
import ProductList from "@/components/main/product/ProductList";
import { useAuth } from "@/provider/AuthProvider";
import RegistrationModal from "@/components/header/modal/RegistrationModal";
import { ProductService } from "@/services/product/product.service";
import { useActionsFavorite } from "@/screens/main/hooks/favorite/useActionsFavorite";
import {useBasket} from "@/provider/BasketProvider";
import SizeTabs from "@/components/ui/tabs/SizeTabs";

export default function RestaurantDetails() {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [categoryFilters, setCategoryFilters] = useState<Record<string, string | null>>({});
    const [restaurant, setRestaurant] = useState<OneRestaurant | null>(null);
    const [productsByCategory, setProductsByCategory] = useState<Record<string, OneProduct[]>>({});
    const [isUserClickedTab, setIsUserClickedTab] = useState(false);

    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const { data } = useGetRestaurant(id as string);
    const { data: productCategory } = useProductRestaurantCategory(id as string);
    const { mutate: toggleFavorite } = useActionsFavorite();
    const { lastRefresh } = useBasket();

    const [pageByCategory, setPageByCategory] = useState<Record<string, number>>({});
    const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const listRef = useRef<HTMLUListElement | null>(null);
    const router = useRouter();

    // const { data: basketData } = useGetBasketProducts();
    // const basketProducts = basketData?.data?.data || [];
    //
    // const totalPrice = basketProducts.reduce(
    //     (acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity,
    //     0
    // );
    // const totalCount = basketProducts.reduce(
    //     (acc: number, item: { quantity: number }) => acc + item.quantity,
    //     0
    // );
    //
    // const minOrderPrice = 500;
    // const progressPercent = Math.min((totalPrice / minOrderPrice) * 100, 100);

    const fetchProducts = async (categoryId: string, page: number) => {
        const subcategoryId = categoryFilters[categoryId] ?? null;
        const size = categoryFilters[`${categoryId}_size`] ?? null;
        try {
            const res = await ProductService.getRestaurantProductList(id as string, {
                categoryId,
                subcategoryId,
                size,
                limit: 10,
                page,
            });

            if (res?.data?.data) {
                setProductsByCategory(prevState => {
                    const updatedProducts = { ...prevState };
                    updatedProducts[categoryId] = page === 1
                        ? res.data.data.products
                        : [...(prevState[categoryId] || []), ...res.data.data.products];
                    return updatedProducts;
                });
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    useEffect(() => {
        if (productCategory?.data?.data) {
            productCategory.data.data.forEach((category: CategoryProduct) => {
                if (!(category.id in pageByCategory)) {
                    setPageByCategory(prev => ({
                        ...prev,
                        [category.id]: 1
                    }));
                }
            });
        }
    }, [productCategory, pageByCategory]);

    const fetchProductsForAllCategories = () => {
        if (!productCategory?.data?.data) return;

        productCategory.data.data.forEach((category: CategoryProduct) => {
            const currentPage = pageByCategory[category.id] || 1;
            fetchProducts(category.id, currentPage);
        });
    };

    useEffect(() => {
        fetchProductsForAllCategories();
    }, [productCategory, categoryFilters, id, lastRefresh]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -70% 0px",
            threshold: 0.01,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const visibleCategoryName = entry.target.getAttribute('data-category-name');
                    if (visibleCategoryName && visibleCategoryName !== activeTab) {
                        setActiveTab(visibleCategoryName);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        Object.entries(categoryRefs.current).forEach(([name, ref]) => {
            const titleEl = ref?.querySelector('.category_title');
            if (titleEl) {
                titleEl.setAttribute('data-category-name', name);
                observer.observe(titleEl);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [productCategory, activeTab]);

    useEffect(() => {
        if (data?.data?.data) {
            setRestaurant(data.data.data);
        }
    }, [data]);

    useEffect(() => {
        if (!isUserClickedTab) return;

        const categoryContainer = categoryRefs.current[activeTab];
        const titleElement = categoryContainer?.querySelector('.category_title');

        if (titleElement instanceof HTMLElement) {
            titleElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
            });
        }

        setIsUserClickedTab(false);
    }, [activeTab, isUserClickedTab]);

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
                setProductsByCategory(prevState => {
                    const updatedProducts = { ...prevState };
                    const updatedProduct = res.data.data;
                    const categoryId = updatedProduct.categoryId;
                    updatedProducts[categoryId] = updatedProducts[categoryId]?.map(product =>
                        product.id === updatedProduct.id
                            ? { ...product, isFavorite: updatedProduct.isFavorite }
                            : product
                    );
                    return updatedProducts;
                });
            },
        });
    };

    return (
        <>
            <div className="container_block_restaurant_page">
                <div className="section_top_restaurant_page">
                    <div className="container_custom_top_restaurant_page">
                        <div className="container_links_img_top_restaurant_page">
                            <Link href={"/restaurant"} type="button" className="links_top_restaurant_page link_top_restaurant_page_go_back link_top_restaurant_page_go_back_restaurant_page">
                                <BackArrowSvg className="icon_top_restaurant_page" />
                            </Link>
                            <button type="button" id="copyButton" className="links_top_restaurant_page link_top_restaurant_page_info_page">
                                <SendSvg className="icon_top_restaurant_page" />
                            </button>
                            <div className="box_img_top_restaurant_page">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className="img_top_restaurant_page" src={restaurant?.banner} alt={restaurant?.name}/>
                            </div>
                        </div>
                        <div className="container_info_search_restaurant_page">
                            <div className="container_photo_name_phone">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className="logo_restaurant_page" src={restaurant?.logo} alt={restaurant?.name}/>
                                <div className="box_text_name_phone">
                                    <div className="box_name_btn_information">
                                        <h2 className="name_restaurant_page">{restaurant?.name}</h2>
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
                                        <p className="text_item_block_info_restaurant_page">{restaurant?.rating} %</p>
                                    </div>

                                    <div className="box_item_block_info_restaurant_page">
                                        <div className="box_icon_item_block_info_restaurant_page">
                                            <DeliverySvg className="icon_item_block_info_restaurant_page"/>
                                        </div>
                                        <p className="text_item_block_info_restaurant_page">{restaurant?.deliveryPrice} грн</p>
                                    </div>

                                    <div className="box_item_block_info_restaurant_page">
                                        <div className="box_icon_item_block_info_restaurant_page">
                                            <ClockSvg className="icon_item_block_info_restaurant_page"/>
                                        </div>
                                        <p className="text_item_block_info_restaurant_page">{restaurant?.cookingTime} хв</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container_tabs_restaurant_page">
                    <div className="list_tabs_wrapper" style={{ position: 'relative' }}>
                        <ul className={`list_tabs_foods ${showLeftArrow || showRightArrow ? "scrollable" : ""}`} ref={listRef}>
                            {productCategory?.data?.data.map((category: CategoryProduct) => (
                                <li
                                    key={category.id}
                                    className={`item_tabs_food ${activeTab === category.name ? "active" : ""}`}
                                    onClick={() => {
                                        setIsUserClickedTab(true);
                                        setActiveTab(category.name);
                                    }}
                                >
                                    <a>{category.name}</a>
                                </li>
                            ))}
                        </ul>

                        {showLeftArrow && (
                            <div
                                className="arrow-left restaurant-arrow"
                                onClick={() => listRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
                            >
                                <ArrowSvg className="icon_arrow_right" />
                            </div>
                        )}

                        {showRightArrow && (
                            <div
                                className="arrow-right restaurant-arrow"
                                onClick={() => listRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
                            >
                                <ArrowSvg className="icon_arrow_right" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="container_categories_with_products">
                    {productCategory?.data?.data.map((category: CategoryProduct) => {
                        const subcategories = category.subcategories || [];
                        const sizes = category.sizes || [];
                        const products = productsByCategory[category.id] || [];

                        return (
                            <div
                                key={category.id}
                                ref={(el) => {
                                    if (el) {
                                        categoryRefs.current[category.name] = el;
                                    }
                                }}
                                data-category-name={category.name}
                                className="category_block"
                            >
                                <h3 className="category_title">{category.name}</h3>

                                <div className="container_filters_restaurant">
                                    {subcategories.length > 0 && (
                                        <SubcategoryTabs
                                            subcategories={subcategories}
                                            activeTab={categoryFilters[category.id] || null}
                                            onTabChange={(subId) => {
                                                setCategoryFilters(prev => ({
                                                    ...prev,
                                                    [category.id]: subId || null,
                                                }));
                                            }}
                                        />
                                    )}

                                    <SizeTabs
                                        sizes={sizes}
                                        activeSize={categoryFilters[`${category.id}_size`] || null}
                                        onSizeChange={(id: string | null) => {
                                            setCategoryFilters(prev => ({
                                                ...prev,
                                                [`${category.id}_size`]: id || null,
                                            }));
                                        }}
                                    />
                                </div>

                                <div
                                    className="container_products rows"
                                >
                                    <ProductList
                                        products={products}
                                        toggleFavorite={toggleFavoriteProduct}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/*<div className="box_custom_footer_cart_progress_bar">*/}
            {/*    <div className={`container_progress_bar ${totalPrice === 0 ? 'hide_bar' : ''}`}>*/}
            {/*        <p className="text_progress_bar">*/}
            {/*            <span className="text_free_delivery">До безкоштовної доставки:</span>*/}
            {/*            <span className="minOrderPrice">{Math.max(minOrderPrice - totalPrice, 0)}</span>*/}
            {/*            <span className="text_currency_progress_bar">грн</span>*/}
            {/*        </p>*/}
            {/*        <div className="progress_bar_container">*/}
            {/*            <div*/}
            {/*                className="progress_bar_filled"*/}
            {/*                style={{ width: `${progressPercent}%` }}*/}
            {/*            ></div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <button className="btn_add_to_cart_product_page">*/}
            {/*        <span className="text_add_to_cart_product_page">Кошик</span>*/}
            {/*        <span className="number_product">{totalCount}</span>*/}
            {/*        <span className="number_add_to_cart_product_page">({totalPrice} грн)</span>*/}
            {/*    </button>*/}
            {/*</div>*/}

            <RegistrationModal isOpen={modalOpen} onClose={toggleModal} />
        </>
    );
}