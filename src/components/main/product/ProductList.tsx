import React, { useEffect, useState } from "react";
import { cn } from "@/helpers/cn";
import { CardSvg, HeartDislikeSvg, HeartLikeSvg, MinesSvg, PlusSvg } from "@/assets";
import Link from "next/link";
import { useActionsBasket } from "@/screens/main/hooks/basket/useActionsBasket";
import { useBasket } from "@/provider/BasketProvider";
import { getOrCreateSessionId } from "@/utils/session/session";
import {useAuth} from "@/provider/AuthProvider";
import {ProductListProps, Products} from "@/types/product/interface";

const ProductList: React.FC<ProductListProps> = ({ products, toggleFavorite }) => {
    const [ cart, setCart ] = useState<Record<string, number>>({});
    const { mutate: updateBasket } = useActionsBasket();
    const { isAuthenticated } = useAuth();
    const { refresh } = useBasket();

    useEffect(() => {
        const initialCart: Record<string, number> = {};
        products.forEach((product) => {
            if (product.quantityInBasket && product.quantityInBasket > 0) {
                initialCart[product.id] = product.quantityInBasket;
            }
        });
        setCart(initialCart);
    }, [products]);

    const addProduct = (product: Products) => {
        const newQuantity = (cart[product.id] || 0) + 1;

        updateBasket(
            {
                productId: product.id,
                quantity: newQuantity,
                restaurantId: product.restaurantId,
                sessionId: !isAuthenticated ? getOrCreateSessionId() : null,
            },
            {
                onSuccess: () => {
                    setCart((prev) => ({
                        ...prev,
                        [product.id]: newQuantity,
                    }));
                    refresh();
                },
            }
        );
    };

    const removeProduct = (product: Products) => {
        const newQuantity = (cart[product.id] || 0) - 1;

        updateBasket(
            {
                productId: product.id,
                quantity: Math.max(newQuantity, 0),
                restaurantId: product.restaurantId,
                sessionId: !isAuthenticated ? getOrCreateSessionId() : null,
            },
            {
                onSuccess: () => {
                    if (newQuantity <= 0) {
                        const newCart = { ...cart };
                        delete newCart[product.id];
                        setCart(newCart);
                    } else {
                        setCart((prev) => ({
                            ...prev,
                            [product.id]: newQuantity,
                        }));
                    }
                    refresh();
                },
            }
        );
    };

    const deleteProduct = (product: Products) => {
        updateBasket(
            {
                productId: product.id,
                quantity: 0,
                restaurantId: product.restaurantId,
                sessionId: !isAuthenticated ? getOrCreateSessionId() : null,
            },
            {
                onSuccess: () => {
                    const newCart = { ...cart };
                    delete newCart[product.id];
                    setCart(newCart);
                    refresh();
                },
            }
        );
    };

    return (
        <>
            {products.map((product) => {
                const isSelected = product.isFavorite;
                const count = cart[product.id] || 0;
                const isAdded = count > 0;

                return (
                    <div key={product.id} className={cn("box_item_product", { added: isAdded, more_one: count > 1 })}>
                        <div className="box_image_btn_wishlist_product">
                            <button
                                className={cn("btn_wishlist_product", isSelected && "selected")}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(product.id);
                                }}
                            >
                                {isSelected ? (
                                    <HeartLikeSvg className="btn_add_wishlist_svg" />
                                ) : (
                                    <HeartDislikeSvg className="btn_add_wishlist_svg" />
                                )}
                            </button>
                            <Link className="link_image_product" href={`/product/${product.id}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className="image_item_product" src={product.image} alt={product.name} />
                            </Link>
                        </div>

                        <div className="box_info_product">
                            <div className="box_top_info_product">
                                <p className="gram_size_product">
                                    <span>{product.weight} г</span>
                                </p>
                                <Link className="link_title_product" href={`/product/${product.id}`}>
                                    <h3>{product.name}</h3>
                                </Link>
                                <p className="composition_product">{product.description}</p>
                            </div>

                            <div className="box_bottom_info_product">
                                <div className="box_price_product">
                                    <p className="price_product">{product.price} грн</p>
                                </div>

                                <div className={cn("box_add_product_calc", {
                                    added: isAdded,
                                    more_one: count > 1,
                                })}>
                                    <button
                                        type="button"
                                        className="btn_delete_product_calc"
                                        onClick={() => deleteProduct(product)}
                                    >
                                        <CardSvg className="icon_delete_product_calc" />
                                    </button>

                                    <button
                                        type="button"
                                        className="btn_minus_product_calc"
                                        onClick={() => removeProduct(product)}
                                        disabled={count === 0}
                                    >
                                        <MinesSvg className="icon_minus_product_calc" />
                                    </button>

                                    <p className="count_product_calc">{count}</p>

                                    <button
                                        type="button"
                                        className="btn_add_product_calc"
                                        onClick={() => addProduct(product)}
                                    >
                                        <PlusSvg className="icon_add_product_calc" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductList;