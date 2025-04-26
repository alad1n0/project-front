"use client";

import {useParams, useRouter} from "next/navigation";
import React, { useState, useEffect } from "react";
import {
    BackArrowSvg,
    CardSvg,
    HeartDislikeSvg,
    HeartLikeSvg,
    MinesSvg,
    PlusSvg,
} from "@/assets";
import { cn } from "@/helpers/cn";
import { useGetOneProduct } from "@/screens/main/hooks/product/useGetOneProduct";
import Link from "next/link";
import { useActionsFavorite } from "@/screens/main/hooks/favorite/useActionsFavorite";
import { useAuth } from "@/provider/AuthProvider";
import RegistrationModal from "@/components/header/modal/RegistrationModal";
import { useActionsBasket } from "@/screens/main/hooks/basket/useActionsBasket";
import {getOrCreateSessionId} from "@/utils/session/session";
import {useBasket} from "@/provider/BasketProvider";
import CartModal from "@/components/header/modal/CartModal";

export default function ProductPage() {
    const params = useParams();
    const productId = params?.id as string;
    const router = useRouter();

    const [cartOpen, setCartOpen] = useState(false);
    const { data: product, refetch } = useGetOneProduct(productId);
    const { mutate: toggleFavorite } = useActionsFavorite();
    const { mutate: updateBasket } = useActionsBasket();
    const { isAuthenticated } = useAuth();
    const { refresh, lastRefresh } = useBasket();

    const [modalOpen, setModalOpen] = useState(false);
    const [cart, setCart] = useState<Record<string, number>>({});
    const [isFavorite, setIsFavorite] = useState<boolean | null>(null);

    useEffect(() => {
        if (product?.data.data?.isFavorite !== undefined) {
            setIsFavorite(product.data.data.isFavorite);
        }
    }, [product]);

    useEffect(() => {
        if (product?.data.data) {
            setCart(() => {
                const newQuantity = product.data.data.quantityInBasket;
                if (newQuantity > 0) {
                    return { [product.data.data.id]: newQuantity };
                } else {
                    return {};
                }
            });
        }
    }, [lastRefresh, product?.data.data]);

    useEffect(() => {
        refetch();
    }, [lastRefresh, refetch]);

    const count = cart[product?.data.data.id] || 0;
    const isAdded = count > 0;

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    const toggleFavoriteProduct = (id: string) => {
        if (!isAuthenticated) {
            setModalOpen(true);
            return;
        }

        toggleFavorite(
            { productId: id, restaurantId: null, type: "product" },
            {
                onSuccess: (res) => {
                    setIsFavorite(res.data.data.isFavorite);
                },
            }
        );
    };

    const toggleModal = () => {
        if (!isAuthenticated) {
            setModalOpen(!modalOpen);
            return;
        }

        router.push("/profile");
    };

    const refreshAndRefetch = async () => {
        refresh();
        await refetch();
    };

    const addProduct = (id: number) => {
        const newQuantity = (cart[id] || 0) + 1;

        updateBasket(
            {
                productId: product?.data.data.id,
                quantity: newQuantity,
                restaurantId: product?.data.data.restaurantId,
                sessionId: !isAuthenticated ? getOrCreateSessionId() : null,
            },
            {
                onSuccess: async () => {
                    setCart((prev) => ({
                        ...prev,
                        [id]: newQuantity,
                    }));
                    await refreshAndRefetch();
                },
            }
        );
    };

    const removeProduct = (id: number) => {
        const newQuantity = (cart[id] || 0) - 1;

        updateBasket(
            {
                productId: product?.data.data.id,
                quantity: Math.max(newQuantity, 0),
                restaurantId: product?.data.data.restaurantId,
                sessionId: !isAuthenticated ? getOrCreateSessionId() : null,
            },
            {
                onSuccess: async () => {
                    if (newQuantity <= 0) {
                        const newCart = { ...cart };
                        delete newCart[id];
                        setCart(newCart);
                    } else {
                        setCart((prev) => ({
                            ...prev,
                            [id]: newQuantity,
                        }));
                    }
                    await refreshAndRefetch();
                },
            }
        );
    };

    const deleteProduct = (id: number) => {
        updateBasket(
            {
                productId: product?.data.data.id,
                quantity: 0,
                restaurantId: product?.data.data.restaurantId,
                sessionId: !isAuthenticated ? getOrCreateSessionId() : null,
            },
            {
                onSuccess: async () => {
                    const newCart = { ...cart };
                    delete newCart[id];
                    setCart(newCart);
                    await refreshAndRefetch();
                },
            }
        );
    };

    return (
        <>
            <div key={product?.data.data.id} className="section_top_product_page">
                <div className="box_img_btn_product_page">
                    <Link
                        href={`/restaurant/${product?.data.data.restaurantId}`}
                        type="button"
                        className="link_top_product_page_go_back"
                    >
                        <BackArrowSvg className="icon_top_restaurant_page"/>
                    </Link>

                    <button
                        className={cn(
                            "btn_wishlist_product btn_wishlist_product_page_right",
                            isFavorite && "selected"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavoriteProduct(product?.data.data.id);
                        }}
                    >
                        {isFavorite ? (
                            <HeartLikeSvg className="btn_add_wishlist_svg"/>
                        ) : (
                            <HeartDislikeSvg className="btn_add_wishlist_svg"/>
                        )}
                    </button>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="product_photo_page"
                        src={product?.data.data.image}
                        alt={product?.data.data.name}
                    />
                </div>

                <div className="product_box_info_product_page">
                    <div className="product_box_top_info_product_page">
                        <div className="product_box_name_price_product_page">
                            <h1 className="product_title_product_page">
                                {product?.data.data.name}
                            </h1>
                            <p className="product_price_product_page">
                                {product?.data.data.price} грн
                            </p>
                        </div>
                        <p className="product_description_product_page">
                            {product?.data.data.description}
                        </p>
                    </div>

                    <div className="box_menu_add_to_cart_product_page_desktop">
                        <button className="btn_add_to_cart_product_page" onClick={() => {
                            addProduct(product?.data.data.id);
                            setTimeout(() => {
                                toggleCart();
                            }, 100);
                        }}
                        >
                            <span className="text_add_to_cart_product_page">У кошик</span>
                        </button>

                        <div
                            className={cn("box_bottom_info_product", {
                                added: isAdded,
                                more_one: count > 1,
                            })}
                        >
                            <div className="box_add_product_calc">
                                <button
                                    type="button"
                                    className="btn_delete_product_calc"
                                    onClick={() => {
                                        deleteProduct(product?.data.data.id);
                                    }}
                                >
                                    <CardSvg className="icon_delete_product_calc"/>
                                </button>

                                <button
                                    type="button"
                                    className="btn_minus_product_calc"
                                    onClick={() => {
                                        removeProduct(product?.data.data.id);
                                    }}
                                    disabled={count === 0}
                                >
                                    <MinesSvg className="icon_minus_product_calc"/>
                                </button>

                                <p className="count_product_calc">{count}</p>

                                <button
                                    type="button"
                                    className="btn_add_product_calc"
                                    onClick={() => {
                                        addProduct(product?.data.data.id);
                                    }}
                                >
                                    <PlusSvg className="icon_add_product_calc"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="box_additional_options_product_desktop">
                        <p className="text_additional_options_product_desktop">
                            Додаткові опції
                        </p>
                        <PlusSvg className="icon_additional_options_product_desktop"/>
                    </button>
                </div>
            </div>

            <CartModal cartOpen={cartOpen} toggleCart={toggleCart}/>
            <RegistrationModal isOpen={modalOpen} onClose={toggleModal}/>
        </>
    );
}