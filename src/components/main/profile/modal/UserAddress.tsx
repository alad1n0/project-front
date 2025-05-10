"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import { CloseSvg } from "@/assets";
import { FormInputLabel } from "@/components/ui/input/FormInputLabel";
import { Address } from "@/types/user/interfaces";
import {ToggleButtonGroup} from "@/components/ui/toggle/DeliveryTypeToggle";
import AddressSelect from "@/components/ui/select/CityAddressSelect";

interface UserAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit";
    selectedAddress?: Address;
    onSave: (address: Address) => void;
}

const initialFormData = {
    city: "",
    locality: null,
    street: "",
    house: "",
    flat: "",
    floor: "",
    apartment: "",
    comment: "",
    type: "city",
    isMain: false
};

const cities = ["Івано-Франківськ", "Львів", "Дрогобич / Трускавець"];
const localities = ["Івано-Франківськ", "Львів", "Дрогобич"];

const UserAddressModal = ({isOpen, onClose, mode, selectedAddress, onSave}: UserAddressModalProps) => {
    const [formData, setFormData] = useState<Address>(initialFormData);
    const [addressTab, setAddressTab] = useState<'cityAddress' | 'otherAddress'>('cityAddress');
    const [openSelectId, setOpenSelectId] = useState<string | null>(null);

    useEffect(() => {
        if (mode === "edit" && selectedAddress) {
            setFormData(selectedAddress);
            setAddressTab(selectedAddress.type === "city" ? "cityAddress" : "otherAddress");
        } else {
            setFormData(initialFormData);
            setAddressTab("cityAddress");
        }
    }, [mode, selectedAddress]);

    const handleToggleSelect = (id: string) => {
        setOpenSelectId(prev => (prev === id ? null : id));
    };

    const handleChange = (field: keyof Address) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-header">
                <h3>{mode === "edit" ? "Редагувати адресу" : "Додати нову адресу"}</h3>
                <button type="button" className="close_button" onClick={onClose}>
                    <CloseSvg className="icon_close_modal" />
                </button>
            </div>
            <div className="modal-content-address">
                <div className="other_address_form">
                    <AddressSelect
                        id="city"
                        data={cities}
                        value={formData.city}
                        onChange={(city) =>
                            setFormData((prev) => ({ ...prev, city }))
                        }
                        isOpen={openSelectId === "city"}
                        onToggle={() => handleToggleSelect("city")}
                    />

                    {mode === "add" && (
                        <ToggleButtonGroup
                            className="toggle_button_profile"
                            value={addressTab}
                            onChange={(tab) => {
                                setAddressTab(tab);
                                setFormData((prev) => ({
                                    ...prev,
                                    type: tab === "cityAddress" ? "city" : "other",
                                }));
                            }}
                            options={[
                                { value: "cityAddress", label: "Місто" },
                                { value: "otherAddress", label: "За містом" },
                            ]}
                        />
                    )}

                    {addressTab === 'cityAddress' && (
                        <div className="other_address_form_row">
                            <FormInputLabel
                                className="profile_address_bk"
                                id="street"
                                label="Вулиця"
                                placeholder="Введіть вулицю"
                                value={formData.street}
                                onChange={handleChange("street")}
                                required
                            />
                            <FormInputLabel
                                className="profile_address_bk"
                                id="house"
                                label="Будинок"
                                placeholder="Введіть будинок"
                                value={formData.house}
                                onChange={handleChange("house")}
                                required
                            />
                        </div>
                    )}

                    {addressTab === 'otherAddress' && (
                        <>
                            <div className="comment-box">
                                <label className="comment-label-address">Населений пункт</label>
                                <AddressSelect
                                    id="locality"
                                    data={localities}
                                    value={formData.locality || "Оберіть населений пункт"}
                                    onChange={(locality) =>
                                        setFormData((prev) => ({ ...prev, locality }))
                                    }
                                    isOpen={openSelectId === "locality"}
                                    onToggle={() => handleToggleSelect("locality")}
                                />
                            </div>

                            <div className="other_address_form_row">
                                <FormInputLabel
                                    className="profile_address_bk"
                                    id="street"
                                    label="Вулиця"
                                    placeholder="Введіть вулицю"
                                    value={formData.street}
                                    onChange={handleChange("street")}
                                    required
                                />
                                <FormInputLabel
                                    className="profile_address_bk"
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
                            className="profile_address_min_width profile_address_bk"
                            id="flat"
                            label="Квартира"
                            placeholder="42"
                            value={formData.flat}
                            onChange={handleChange("flat")}
                        />
                        <FormInputLabel
                            className="profile_address_min_width profile_address_bk"
                            id="floor"
                            label="Під’їзд"
                            placeholder="4"
                            value={formData.floor}
                            onChange={handleChange("floor")}
                        />
                        <FormInputLabel
                            className="profile_address_min_width profile_address_bk"
                            id="apartment"
                            label="Поверх"
                            placeholder="6"
                            value={formData.apartment}
                            onChange={handleChange("apartment")}
                        />
                    </div>
                    <div className="comment-box profile_address_bk">
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

                <button onClick={handleSubmit} className="continue-button">
                    {mode === "edit" ? "Зберегти зміни" : "Додати адресу"}
                </button>

            </div>
        </Modal>
    );
};

export default UserAddressModal;