"use client"

import React, {useEffect, useMemo, useState} from "react";
import {BackArrowSvg, CardSvg, MinesSvg, PlusSvg, CloseSvg} from "@/assets";
import {useBasket} from "@/provider/BasketProvider";
import {useGetBasketProducts} from "@/components/header/hooks/useGetBasketProducts";
import {useActionsBasket} from "@/screens/main/hooks/basket/useActionsBasket";
import {Products} from "@/types/product/interface";
import {useAuth} from "@/provider/AuthProvider";
import {cn} from "@/helpers/cn";
import Link from "next/link";
import {getOrCreateSessionId} from "@/utils/session/session";
import { FormInputLabel } from "@/components/ui/input/FormInputLabel";
import {ToggleButtonGroup} from "@/components/ui/toggle/DeliveryTypeToggle";
import {RadioList} from "@/components/ui/radio/RadioList";
import CheckoutAddressForm from "@/components/ui/form/CheckoutAddressForm";
import {useGetProfileInfo} from "@/screens/main/hooks/user/useGetProfileInfo";
import {usePostUpdateUserAddress} from "@/components/main/profile/hooks/usePostUpdateUserAddress";
import {UserAddress} from "@/types/user/interfaces";
import {Button} from "@/components/ui/button/Button";
import AddressSelect from "@/components/ui/select/CityAddressSelect";

const addressesSelfPickup = [
    {id: 'radio1', label: "Червоної калини, 71"},
    {id: 'radio2', label: "Городоцька, 214"},
    {id: 'radio3', label: "Дорошенка, 77"}
]

const phoneOptions = [
    {id: "call", label: "Зателефонувати мені"},
    {id: "no-call", label: "Не передзвоювати мені, я впевнений (-а) в замовленні"}
];

const cities = ["Івано-Франківськ", "Львів", "Дрогобич / Трускавець"];
const localities = ["Івано-Франківськ", "Львів", "Дрогобич"];
const times = ['На зараз', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
const payment = ['Картка', 'Готівка'];

const Checkout = () => {
    const { data, isLoading } = useGetBasketProducts();
    const [cart, setCart] = useState<Record<string, number>>({});
    const { mutate: updateBasket } = useActionsBasket();
    const { isAuthenticated } = useAuth();
    const { refresh } = useBasket();
    const { count } = useBasket();

    const [addressType, setAddressType] = useState<'cityAddress' | 'otherAddress'>('cityAddress');
    const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
    const [selectedAddressId, setSelectedAddressId] = useState<string>('');
    const [selectedAddressSamo, setselectedAddressSamo] = useState<string>('radio1');
    const [selectedTime, setSelectedTime] = useState('На зараз');
    const [openSelectId, setOpenSelectId] = useState<string | null>(null);
    const [addressTab, setAddressTab] = useState<'my' | 'other'>('my');
    const [formData, setFormData] = useState({
            city: '',
            locality: '',
            street: '',
            house: '',
            flat: '',
            floor: '',
            apartment: '',
            comment: ''
    });
    const [phoneCall, setPhoneCall] = useState('call');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: userInfo } = isAuthenticated ? useGetProfileInfo() : { data: null };
    const { mutateAsync: patchUserAddress } = usePostUpdateUserAddress();

    useEffect(() => {
        if (isAuthenticated) {
            if (userInfo?.userProfile) {
                setName(`${userInfo.userProfile.firstName || ''} ${userInfo.userProfile.lastName || ''}`.trim());
                setPhone(userInfo.phone || '');
            }
        }
    }, [userInfo, isAuthenticated]);

    const handleChange = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    const handleToggleSelect = (id: string) => {
        setOpenSelectId(prev => (prev === id ? null : id));
    };

    const handleChangeAddressType = (value: string) => {
        setAddressType(value as 'cityAddress' | 'otherAddress');
    };

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

    useEffect(() => {
        if (isAuthenticated && userInfo?.userProfile) {
            setName(`${userInfo.userProfile.firstName || ''} ${userInfo.userProfile.lastName || ''}`.trim());
            setPhone(userInfo.phone || '');
        }
    }, [userInfo, isAuthenticated]);

    useEffect(() => {
        if (userInfo?.userProfile?.addresses?.length) {
            const main = userInfo.userProfile.addresses.find((a) => a.isMain);
            if (main) {
                setSelectedAddressId(main.id);
            }
        }
    }, [userInfo]);

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
                },
            }
        );
    };

    const handleMainAddressChange = async (newMainId: string) => {
        if (newMainId === selectedAddressId) return;

        const list = userInfo?.userProfile?.addresses;
        if (!list) return;

        const prevMain = list.find(a => a.id === selectedAddressId);
        const newMain = list.find(a => a.id === newMainId);

        if (prevMain && newMain) {
            const { id: prevId, ...prevData } = prevMain;
            const { id: newId, ...newData } = newMain;

            await patchUserAddress({
                id: prevId,
                data: { ...prevData, isMain: false }
            });

            await patchUserAddress({
                id: newId,
                data: { ...newData, isMain: true }
            });

            setSelectedAddressId(newMainId);
        }
    };

    const formatAddress = (address: UserAddress) => {
        if (!address) return "";

        const parts = [
            address.city,
            address.street || "",
            `буд. ${address.house}`,
            address.flat ? `кв. ${address.flat}` : "",
            address.floor ? `під'їзд ${address.floor}` : "",
            address.apartment ? `поверх ${address.apartment}` : ""
        ];

        return parts.filter(Boolean).join(", ");
    };

    return (
        <div className="container_checkout_page">
            <div className="box_top_checkout_page">
                <button type="button" className="back_button">
                    <BackArrowSvg className="icon_back_button" />
                </button>
                <h1 className="title_checkout">Оформити замовлення</h1>
            </div>

            <div className="box_form_checkout_page">
                <div className="box_from_checkout_container">
                    <div className="form_checkout_page">
                        <div className="container_form_checkout">
                            <h2 className="title_container_form_checkout">Персональні дані</h2>
                            <div className="box_form_checkout">
                                <FormInputLabel
                                    id="name"
                                    label="Ваше ім’я"
                                    placeholder="Введіть ім’я"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />

                                <FormInputLabel
                                    id="phone"
                                    label="Телефон"
                                    placeholder="+38 000 00 00 000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <ToggleButtonGroup
                                value={deliveryType}
                                onChange={setDeliveryType}
                                options={[
                                    { value: "delivery", label: "Доставка" },
                                    { value: "pickup", label: "Самовивіз" },
                                ]}
                            />
                        </div>

                        {deliveryType === 'delivery' && (
                            <div className="container_form_checkout">
                                <h2 className="title_container_form_checkout">Адреса доставки</h2>

                                {isAuthenticated || (userInfo?.userProfile?.addresses?.length ?? 0) > 0 ? (
                                    <>
                                        <ToggleButtonGroup
                                            value={addressTab}
                                            onChange={setAddressTab}
                                            options={[
                                                { value: "my", label: "Мої локації" },
                                                { value: "other", label: "Інше місце" },
                                            ]}
                                        />

                                        {addressTab === 'my' && (
                                            <RadioList
                                                options={userInfo?.userProfile?.addresses.map((address) => ({
                                                    id: address.id,
                                                    label: formatAddress(address),
                                                    isActive: address.id === selectedAddressId,
                                                })) || []}
                                                value={selectedAddressId}
                                                onChange={handleMainAddressChange}
                                            />
                                        )}

                                        {addressTab === 'other' && (
                                            <>
                                                <CheckoutAddressForm
                                                    formData={formData}
                                                    setFormData={setFormData}
                                                    handleChange={handleChange}
                                                    cities={cities}
                                                    localities={localities}
                                                    addressType={addressType}
                                                    setAddressType={handleChangeAddressType}
                                                    openSelectId={openSelectId}
                                                    handleToggleSelect={handleToggleSelect}
                                                />
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <CheckoutAddressForm
                                            formData={formData}
                                            setFormData={setFormData}
                                            handleChange={handleChange}
                                            cities={cities}
                                            localities={localities}
                                            addressType={addressType}
                                            setAddressType={handleChangeAddressType}
                                            openSelectId={openSelectId}
                                            handleToggleSelect={handleToggleSelect}
                                        />
                                    </>
                                )}
                            </div>
                        )}

                        {deliveryType === 'pickup' && (
                            <div className="container_form_checkout">
                                <h2 className="title_container_form_checkout">Адреса самовивозу</h2>

                                <RadioList
                                    options={addressesSelfPickup}
                                    value={selectedAddressSamo}
                                    onChange={setselectedAddressSamo}
                                />
                            </div>
                        )}
                    </div>
                    <div className="form_checkout_page_final">
                        <h2>Деталі доставки</h2>
                        <div className="tab_item_time">
                            {times.map((time) => (
                                <Button
                                    key={time}
                                    variant={time === selectedTime ? 'default' : 'outline'}
                                    className={`rounded-full px-4 py-0 whitespace-nowrap ${time === selectedTime ? 'active-button' : 'bg-white text-gray-700 default-button'}`}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </Button>
                            ))}
                        </div>
                        <div className="flex flex-row flex-wrap gap-4">
                            <div className="flex-1">
                                <label className="comment-label-address">Форма оплати</label>
                                <AddressSelect
                                    id="locality"
                                    data={payment}
                                    value={formData.locality || "Оберіть форму оплати"}
                                    onChange={(locality) => setFormData((prev) => ({ ...prev, locality }))}
                                    className="select-chechout w-full"
                                    isOpen={openSelectId === "locality"}
                                    onToggle={() => handleToggleSelect("locality")}
                                />
                            </div>

                            <div className="flex-1">
                                <FormInputLabel
                                    className="w-full"
                                    id="new_floor"
                                    label="Підготувати решту з"
                                    placeholder="200 грн"
                                    value={formData.floor}
                                    onChange={handleChange("floor")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container_form_checkout_product">
                    <div className="container_count_form_checkout">
                        <h2 className="title_container_form_checkout">Ваше замовлення</h2>
                        <React.Fragment>
                            <span className="text_count_checkout">{count}</span>
                        </React.Fragment>
                    </div>

                    <div className="container_productions_checkout">
                        {isLoading ? (
                            <p></p>
                        ) : (
                            items.map((item: Products) => {
                                const count = cart[item.id] || 0;
                                const isAdded = count > 0;

                                return (
                                    <div key={item.id} className="container_item_product_checkout">
                                        <div className="box_top_item_product_cart">
                                            {item.image && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img className="image_item_product_cart" src={item.image} alt={item.name} width={100} height={100} />
                                            )}
                                            <div className="box_info_item_product_checkout">
                                                <div className="box_info_item_product_cart">
                                                    <div className="box_title_btn_delete_gram_item_product_cart">
                                                        <div className="box_title_btn_delete_item_product_cart">
                                                            <Link
                                                                className="link_title_item_product_cart"
                                                                href={"/product/" + item.id}
                                                            >
                                                                <h3 className="title_item_product_cart">{item.name}</h3>
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="btn_delete_item_product_cart"
                                                                onClick={() => deleteProduct(item)}
                                                            >
                                                                <CloseSvg className="icon_delete_item_product_cart" />
                                                            </button>
                                                        </div>
                                                        {item.weight && <p className="gram_item_product_cart">{item.weight} г</p>}
                                                    </div>
                                                </div>

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
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="container_price_checkout">
                        <div className="box_price_checkout">
                            <p className="text_price_checkout">До сплати:</p>
                            <p className="price_checkout"><span>{totalPrice}</span> грн</p>
                        </div>
                        <div className="decoration_line_checkout"></div>

                        <RadioList
                            options={phoneOptions}
                            value={phoneCall}
                            onChange={setPhoneCall}
                            name="phone-call"
                            showDivider={false}
                        />

                        <button className="btn_red_with_arrow">Оформити замовлення</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;