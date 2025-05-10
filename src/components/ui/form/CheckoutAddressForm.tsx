"use client";
import AddressSelect from "@/components/ui/select/CityAddressSelect";

import React from "react";
import {ToggleButtonGroup} from "@/components/ui/toggle/DeliveryTypeToggle";
import {FormInputLabel} from "@/components/ui/input/FormInputLabel";

interface FormData {
    city: string;
    locality: string;
    street: string;
    house: string;
    flat: string;
    floor: string;
    apartment: string;
    comment: string;
}

interface CheckoutAddressFormProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    handleChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    cities: string[];
    localities: string[];
    addressType: string;
    setAddressType: (type: string) => void;
    openSelectId: string | null;
    handleToggleSelect: (id: string) => void;
}

const CheckoutAddressForm: React.FC<CheckoutAddressFormProps> = ({formData, setFormData, handleChange, cities, localities, addressType, setAddressType, openSelectId, handleToggleSelect}) => {
    return (
        <>
            <div className="other_address_form">
                <AddressSelect
                    id="city"
                    data={cities}
                    value={formData.city}
                    onChange={(city) => setFormData((prev) => ({ ...prev, city }))}
                    className="select-chechout"
                    isOpen={openSelectId === "city"}
                    onToggle={() => handleToggleSelect("city")}
                />
            </div>

            <ToggleButtonGroup
                value={addressType}
                onChange={(tab) => setAddressType(tab)}
                options={[
                    { value: "cityAddress", label: "Місто" },
                    { value: "otherAddress", label: "За містом" },
                ]}
            />

            <div className="other_address_form">
                {addressType === "cityAddress" && (
                    <div className="other_address_form_row">
                        <FormInputLabel
                            id="new_street"
                            label="Вулиця"
                            placeholder="Введіть вулицю"
                            value={formData.street}
                            onChange={handleChange("street")}
                            required
                        />
                        <FormInputLabel
                            id="new_house"
                            label="Будинок"
                            placeholder="Введіть будинок"
                            value={formData.house}
                            onChange={handleChange("house")}
                            required
                        />
                    </div>
                )}

                {addressType === "otherAddress" && (
                    <>
                        <div className="comment-box">
                            <label className="comment-label-address">Населений пункт</label>
                            <AddressSelect
                                id="locality"
                                data={localities}
                                value={formData.locality || "Оберіть населений пункт"}
                                onChange={(locality) => setFormData((prev) => ({ ...prev, locality }))}
                                className="select-chechout"
                                isOpen={openSelectId === "locality"}
                                onToggle={() => handleToggleSelect("locality")}
                            />
                        </div>

                        <div className="other_address_form_row">
                            <FormInputLabel
                                className="other_address_min_width"
                                id="street"
                                label="Вулиця"
                                placeholder="Введіть вулицю"
                                value={formData.street}
                                onChange={handleChange("street")}
                                required
                            />
                            <FormInputLabel
                                className="other_address_min_width"
                                id="house"
                                label="Будинок"
                                placeholder="Введіть будинок"
                                value={formData.house}
                                onChange={handleChange("house")}
                                required
                            />
                        </div>
                    </>
                )}

                <div className="other_address_form_row">
                    <FormInputLabel
                        className="other_address_min_width"
                        id="new_flat"
                        label="Квартира"
                        placeholder="42"
                        value={formData.flat}
                        onChange={handleChange("flat")}
                    />

                    <FormInputLabel
                        className="other_address_min_width"
                        id="new_floor"
                        label="Під'їзд"
                        placeholder="4"
                        value={formData.floor}
                        onChange={handleChange("floor")}
                    />

                    <FormInputLabel
                        className="other_address_min_width"
                        id="new_apartment"
                        label="Поверх"
                        placeholder="6"
                        value={formData.apartment}
                        onChange={handleChange("apartment")}
                    />
                </div>

                <div className="comment-box">
                    <label className="comment-label">Коментар</label>
                    <textarea
                        className="comment-textarea"
                        placeholder="Введіть коментар"
                        rows={4}
                        value={formData.comment}
                        onChange={handleChange("comment")}
                    />
                </div>
            </div>
        </>
    );
};

export default CheckoutAddressForm;