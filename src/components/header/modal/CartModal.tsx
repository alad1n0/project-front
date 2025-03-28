import React, {useEffect} from "react";
import {CardSvg, CloseSvg, MinesSvg, PhotoPizza, PhotoSushi, PlusSvg} from "@/assets";
import Image from "next/image";

interface CartModalProps {
    cartOpen: boolean;
    toggleCart: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ cartOpen, toggleCart }) => {
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

    return (
        <>
            <div className={`mobile-menu-overlay ${cartOpen ? 'active' : ''}`} onClick={toggleCart}></div>
            <div className={`container_cart_modal ${cartOpen ? 'open' : ''}`}>
                <div className="box_top_cart_modal">
                    <h3 className="title_cart_modal">Кошик</h3>
                    <button
                        type="button"
                        className="button_close_cart_modal"
                        onClick={toggleCart}
                    >
                        <CloseSvg className="icon_close_mobile_menu" />
                    </button>
                </div>
                <div className="container_productions_cart ">
                    <div className="container_item_product_cart">
                        <div className="box_top_item_product_cart">
                            <Image className="image_item_product_cart" src={PhotoPizza} alt="photo product"/>
                            <div className="box_info_item_product_cart">
                                <div className="box_title_btn_delete_gram_item_product_cart">
                                    <div className="box_title_btn_delete_item_product_cart">
                                        <a className="link_title_item_product_cart" href="#"><h3
                                            className="title_item_product_cart">Піца з шинкою та грибами</h3></a>
                                        <button type="button" id="btnDeleteCart" className="btn_delete_item_product_cart">
                                            <CardSvg className="icon_delete_item_product_cart"/>
                                        </button>
                                    </div>
                                    <p className="gram_item_product_cart">720 г</p>
                                </div>
                                <div className="box_additionally_cart">
                                    <p className="title_additionally_cart">Додатково:</p>
                                    <ul className="list_additionally_cart">
                                        <li className="item_additionally_cart">+ Сирний бортик</li>
                                        <li className="item_additionally_cart">+ Печериці</li>
                                        <li className="item_additionally_cart">+ Бекон</li>
                                        <li className="item_additionally_cart">+ Маслини</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="decoration_line_item_product_cart"></div>
                        <div className="box_bottom_item_product_cart">
                            <div className="box_price_item_product_cart">
                                <p className="price_item_cart">310</p>
                                <p className="currency_item_cart">грн</p>
                            </div>
                            <div className="box_calc_item_product_cart">
                                <button type="button" className="btn_delete_item_product_cart btnDeleteCartCalc">
                                    <CardSvg className="icon_delete_item_product_cart"/>
                                </button>
                                <button type="button" className="btn_calc_item_product_cart btnMinusCart">
                                    <MinesSvg className="icon_calc_item_production_cart"/>
                                </button>
                                <p className="count_item_product_cart ">3</p>
                                <button type="button" className="btn_calc_item_product_cart btnPlusCart">
                                    <PlusSvg className="icon_calc_item_production_cart plus"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="container_item_product_cart">
                        <div className="box_top_item_product_cart">
                            <Image className="image_item_product_cart" src={PhotoSushi} alt="photo product"/>
                            <div className="box_title_btn_delete_gram_item_product_cart">
                                <div className="box_title_btn_delete_item_product_cart">
                                    <a href="#" className="link_title_item_product_cart"><h3
                                        className="title_item_product_cart">Філадельфія з авокадо</h3></a>
                                    <button type="button" id="btnDeleteCart" className="btn_delete_item_product_cart">
                                        <CardSvg className="icon_delete_item_product_cart"/>
                                    </button>
                                </div>
                                <p className="gram_item_product_cart">250 г</p>
                            </div>
                        </div>
                        <div className="decoration_line_item_product_cart"></div>
                        <div className="box_bottom_item_product_cart">
                            <div className="box_price_item_product_cart">
                                <p className="price_item_cart">174</p>
                                <p className="currency_item_cart">грн</p>
                            </div>
                            <div className="box_calc_item_product_cart">
                                <button type="button" className="btn_delete_item_product_cart btn_delete_item_product_cart_calc btnDeleteCartCalc">
                                    <CardSvg className="icon_delete_item_product_cart"/>
                                </button>
                                <button type="button" className="btn_calc_item_product_cart btnMinusCart">
                                    <MinesSvg className="icon_calc_item_production_cart"/>
                                </button>
                                <p className="count_item_product_cart">1</p>
                                <button type="button" className="btn_calc_item_product_cart btnPlusCart">
                                    <PlusSvg className="icon_calc_item_production_cart plus"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container_total_order_cart">
                    <div className="box_total_order_cart">
                        <p className="title_total_order">Разом:</p>
                        <p className="price_total_order">1024.00 грн</p>
                    </div>
                    <div className="box_to_pay_order_cart">
                        <h3 className="title_to_pay_order">До сплати:</h3>
                        <p className="price_to_pay_order">1024.00 <span className="price_to_pay_currency_order">грн</span>
                        </p>
                    </div>
                    <a href="" className="btn_red_with_arrow">Оформити замовлення</a>

                </div>
            </div>
        </>
    );
};

export default CartModal;