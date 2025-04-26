import React, {useState, useEffect, useMemo} from "react";
import { CardSvg, CloseSvg, MinesSvg, PlusSvg } from "@/assets";
import { useGetBasketProducts } from "@/components/header/hooks/useGetBasketProducts";
import { Products } from "@/types/product/interface";
import Link from "next/link";
import { cn } from "@/helpers/cn";
import { getOrCreateSessionId } from "@/utils/session/session";
import {useAuth} from "@/provider/AuthProvider";
import {useActionsBasket} from "@/screens/main/hooks/basket/useActionsBasket";
import {useBasket} from "@/provider/BasketProvider";

interface CartModalProps {
    cartOpen: boolean;
    toggleCart: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ cartOpen, toggleCart }) => {
    const { data, isLoading, refetch } = useGetBasketProducts();
    const [cart, setCart] = useState<Record<string, number>>({});
    const { mutate: updateBasket } = useActionsBasket();
    const { isAuthenticated } = useAuth();
    const { refresh } = useBasket();

    useEffect(() => {
        if (cartOpen) {
            refetch();
        }
    }, [cartOpen, refetch]);

    useEffect(() => {
        if (cartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [cartOpen]);

    const items = useMemo(() => data?.data?.data || [], [data]);

    const totalPrice = items.reduce((acc: number, item: Products) => {
        return acc + (item.price * (cart[item.id] || 1));
    }, 0);

    useEffect(() => {
        const initialCart: Record<string, number> = {};
        items.forEach((product: Products) => {
            if (product.quantityInBasket && product.quantityInBasket > 0) {
                initialCart[product.id] = product.quantityInBasket;
            }
        });
        setCart(initialCart);
    }, [items]);

    const addProduct = (product: Products) => {
        const newQuantity = (cart[product.id] || 0) + 1;

        updateBasket(
            {
                productId: product.id,
                quantity: newQuantity,
                restaurantId: product.restaurantId,
                sessionId: !isAuthenticated ? getOrCreateSessionId() ?? null : null,
            },
            {
                onSuccess: () => {
                    setCart((prev) => ({
                        ...prev,
                        [product.id]: newQuantity,
                    }));
                    refresh();
                    refetch();
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
                sessionId: !isAuthenticated ? getOrCreateSessionId() ?? null : null,
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
                    refetch();
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
                sessionId: !isAuthenticated ? getOrCreateSessionId() ?? null : null,
            },
            {
                onSuccess: () => {
                    const newCart = { ...cart };
                    delete newCart[product.id];
                    setCart(newCart);
                    refresh();
                    refetch();
                },
            }
        );
    };

    return (
        <>
            <div className={`mobile-menu-overlay ${cartOpen ? 'active' : ''}`} onClick={toggleCart}></div>
            <div className={`container_cart_modal ${cartOpen ? 'open' : ''}`}>
                <div className="box_top_cart_modal">
                    <h3 className="title_cart_modal">Кошик</h3>
                    <button type="button" className="button_close_cart_modal" onClick={toggleCart}>
                        <CloseSvg className="icon_close_mobile_menu" />
                    </button>
                </div>
                <div className="container_productions_cart">
                    {isLoading ? (
                        <p></p>
                    ) : items.length === 0 ? (
                        <p></p>
                    ) : (
                        items.map((item: Products) => {
                            const count = cart[item.id] || 0;
                            const isAdded = count > 0;

                            return (
                                <div key={item.id} className="container_item_product_cart">
                                    <div className="box_top_item_product_cart">
                                        {item.image && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img className="image_item_product_cart" src={item.image} alt={item.name} width={100} height={100} />
                                        )}
                                        <div className="box_info_item_product_cart">
                                            <div className="box_title_btn_delete_gram_item_product_cart">
                                                <div className="box_title_btn_delete_item_product_cart">
                                                    <Link
                                                        className="link_title_item_product_cart"
                                                        href={"/product/" + item.id}
                                                        onClick={toggleCart}
                                                    >
                                                        <h3 className="title_item_product_cart">{item.name}</h3>
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="btn_delete_item_product_cart"
                                                        onClick={() => deleteProduct(item)}
                                                    >
                                                        <CardSvg className="icon_delete_item_product_cart" />
                                                    </button>
                                                </div>
                                                {item.weight && <p className="gram_item_product_cart">{item.weight} г</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="decoration_line_item_product_cart"></div>

                                    <div className={cn("box_bottom_info_product", {
                                        added: isAdded, more_one: count > 1
                                    })}>
                                        <div className="box_price_item_product_cart">
                                            <p className="price_item_cart">{item.price}</p>
                                            <p className="currency_item_cart">грн</p>
                                        </div>

                                        <div className="box_add_product_calc">
                                            <button
                                                type="button"
                                                className="btn_delete_product_calc"
                                                onClick={() => deleteProduct(item)}
                                            >
                                                <CardSvg className="icon_delete_product_calc" />
                                            </button>

                                            <button
                                                type="button"
                                                className="btn_minus_product_calc"
                                                onClick={() => removeProduct(item)}
                                                disabled={count === 0}
                                            >
                                                <MinesSvg className="icon_minus_product_calc" />
                                            </button>

                                            <p className="count_product_calc">{count}</p>

                                            <button
                                                type="button"
                                                className="btn_add_product_calc"
                                                onClick={() => addProduct(item)}
                                            >
                                                <PlusSvg className="icon_add_product_calc" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="container_total_order_cart">
                    <div className="box_total_order_cart">
                        <p className="title_total_order">Разом:</p>
                        <p className="price_total_order">{totalPrice.toFixed(2)} грн</p>
                    </div>

                    <div className="box_to_pay_order_cart">
                        <h3 className="title_to_pay_order">До сплати:</h3>
                        <p className="price_to_pay_order">{totalPrice.toFixed(2)} <span className="price_to_pay_currency_order">грн</span></p>
                    </div>

                    <a href="" className="btn_red_with_arrow">Оформити замовлення</a>
                </div>
            </div>
        </>
    );
};

export default CartModal;