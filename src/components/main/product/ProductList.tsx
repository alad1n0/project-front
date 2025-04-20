import React, { useState } from "react";
import {cn} from "@/helpers/cn";
import {CardSvg, HeartDislikeSvg, HeartLikeSvg, MinesSvg, PlusSvg} from "@/assets";
import Link from "next/link";

interface ProductList {
    id: number;
    name: string;
    image: string;
    weight: number;
    description: string;
    price: number;
}

interface ProductListProps {
    products: ProductList[];
    selectedProduct: Record<number, boolean>;
    toggleFavorite: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, selectedProduct, toggleFavorite }) => {
    const [cart, setCart] = useState<Record<number, number>>({});

    const addProduct = (id: number) => {
        setCart(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    const removeProduct = (id: number) => {
        setCart(prev => {
            const newCount = (prev[id] || 0) - 1;
            if (newCount <= 0) {
                const newCart = { ...prev };
                delete newCart[id];
                return newCart;
            }
            return {
                ...prev,
                [id]: newCount
            };
        });
    };

    const deleteProduct = (id: number) => {
        setCart(prev => {
            const newCart = { ...prev };
            delete newCart[id];
            return newCart;
        });
    };

    return (
        <>
            {products.map((product) => {
                const isSelected = selectedProduct[product.id] || false;
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
                                {isSelected ? <HeartLikeSvg className="btn_add_wishlist_svg" /> : <HeartDislikeSvg className="btn_add_wishlist_svg" />}
                            </button>
                            <Link className="link_image_product" href="#">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className="image_item_product" src={product.image} alt={product.name} />
                            </Link>
                        </div>

                        <div className="box_info_product">
                            <div className="box_top_info_product">
                                <p className="gram_size_product"><span>{product.weight} г</span></p>
                                <Link className="link_title_product" href="#"><h3>{product.name}</h3></Link>
                                <p className="composition_product">{product.description}</p>
                            </div>

                            <div className="box_bottom_info_product">
                                <div className="box_price_product"><p className="price_product">{product.price} грн</p></div>

                                <div className="box_add_product_calc">
                                    <button type="button" className="btn_delete_product_calc" onClick={() => deleteProduct(product.id)}>
                                        <CardSvg className="icon_delete_product_calc"/>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn_minus_product_calc"
                                        onClick={() => removeProduct(product.id)}
                                        disabled={count === 0}
                                    >
                                        <MinesSvg className="icon_minus_product_calc"/>
                                    </button>

                                    <p className="count_product_calc">{count}</p>

                                    <button type="button" className="btn_add_product_calc" onClick={() => addProduct(product.id)}>
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