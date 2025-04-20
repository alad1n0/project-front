"use client"

import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    ArrowSvg,
    BackArrowSvg,
    ClockSvg,
    DeliverySvg,
    SendSvg,
    StarsSvg,
    TelePhoneSvg
} from "@/assets";
import {useParams, useRouter} from "next/navigation";
import {OneRestaurant} from "@/types/restaurant/interfaces";
import {useGetRestaurant} from "@/screens/main/hooks/restaurant/useGetRestaurant";
import Link from "next/link";
import {useProductRestaurantCategory} from "@/screens/main/hooks/product/useProductRestaurantCategory";
import {CategoryProduct, ProductParams} from "@/types/product/interface";
import SubcategoryTabs from "@/components/ui/tabs/Tabs";
import ProductList from "@/components/main/product/ProductList";
import {useAuth} from "@/provider/AuthProvider";
import RegistrationModal from "@/components/header/modal/RegistrationModal";
import {ProductService} from "@/services/product/product.service";

export default function RestaurantDetails() {
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [categoryFilters, setCategoryFilters] = useState<Record<string, string | null>>({});
    const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});
    const [restaurant, setRestaurant] = useState<OneRestaurant | null>(null);
    const [productsByCategory, setProductsByCategory] = useState<Record<string, any[]>>({});
    const [isUserClickedTab, setIsUserClickedTab] = useState(false);

    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const { data } = useGetRestaurant(id as string);
    const { data: productCategory } = useProductRestaurantCategory(id as string);

    const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const listRef = useRef<HTMLUListElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            if (!productCategory?.data?.data) return;

            const newProductsByCategory: Record<string, any[]> = {};

            await Promise.all(
                productCategory.data.data.map(async (category: CategoryProduct) => {
                    const subcategoryId = categoryFilters[category.id] ?? null;

                    const res = await ProductService.getRestaurantProductList(id as string, {
                        categoryId: category.id,
                        subcategoryId: subcategoryId,
                    });

                    newProductsByCategory[category.id] = res?.data?.data || [];
                })
            );

            setProductsByCategory(newProductsByCategory);
        };

        fetchProducts();
    }, [productCategory, categoryFilters, id]);

    useEffect(() => {
        // Налаштування спостерігача
        const observerOptions = {
            root: null,  // Спостерігаємо за елементами на сторінці
            rootMargin: "0px 0px -70% 0px", // Зсуваємо нижній відступ, щоб спостерігач спрацьовував, коли елемент буде майже в видимій області
            threshold: 0.1,  // Мінімум 10% елемента має бути видно для активації
        };

        // Функція для обробки видимості категорій
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const visibleCategoryName = entry.target.getAttribute('data-category-name');
                    console.log("Visible category:", visibleCategoryName);  // Перевірка
                    if (visibleCategoryName && visibleCategoryName !== activeTab) {
                        setActiveTab(visibleCategoryName);
                    }
                }
            });
        };

        // Створюємо спостерігача
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Спостерігаємо за усіма категоріями
        Object.entries(categoryRefs.current).forEach(([name, ref]) => {
            const titleEl = ref?.querySelector('.category_title');
            if (titleEl) {
                titleEl.setAttribute('data-category-name', name);
                observer.observe(titleEl);  // Починаємо спостереження
            }
        });

        // Очищаємо спостерігача, коли компонент буде знищений
        return () => {
            observer.disconnect();
        };
    }, [productCategory, activeTab]);

    useEffect(() => {
        if (data?.data?.data) {
            console.log(data.data.data);
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
    }, [activeTab]);

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

    const toggleFavoriteProduct = (id: number) => {
        if (!isAuthenticated) {
            setModalOpen(true);
            return;
        }

        setSelectedProducts((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
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
                                <img className="img_top_restaurant_page" src={restaurant?.banner} alt={restaurant?.name}/>
                            </div>
                        </div>
                        <div className="container_info_search_restaurant_page">
                            <div className="container_photo_name_phone">
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
                                {/*<div className="box_content_close_restaurant">*/}
                                {/*    <RestCloseSvg className="icon_close_restaurant_page"/>*/}
                                {/*    <p className="text_close_restaurant_page">Зачинено до 10:00</p>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container_tabs_restaurant_page">
                    <div className="list_tabs_wrapper" style={{ position: 'relative' }}>
                        <ul className={`list_tabs_foods ${showLeftArrow || showRightArrow ? "scrollable" : ""}`} ref={listRef} >
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
                                className="arrow-left"
                                onClick={() => listRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
                            >
                                <ArrowSvg className="icon_arrow_right" />
                            </div>
                        )}

                        {showRightArrow && (
                            <div
                                className="arrow-right"
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

                                <div className="container_products rows">
                                    <ProductList
                                        products={productsByCategory[category.id] || []}
                                        selectedProduct={selectedProducts}
                                        toggleFavorite={toggleFavoriteProduct}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <RegistrationModal isOpen={modalOpen} onClose={toggleModal} />
        </>
    );
}