"use client"

import React, {useEffect, useState} from "react";
import BoxProfile from "@/components/ui/box-profile/BoxProfile";
import SocialProfileComponent from "@/components/main/profile/social/SocialProfileComponent";
import {Address, ProfileInfo, UserAddress} from "@/types/user/interfaces";
import EditNameModal from "@/components/main/profile/modal/UserInfoUpdate";
import EditPhoneModal from "@/components/main/profile/modal/UserPhoneUpdate";
import {usePostUserPhone} from "@/components/main/profile/hooks/usePostUserPhone";
import {usePostUserInfoUpdate} from "@/components/main/profile/hooks/usePostUserInfoUpdate";
import {RadioListProfile} from "@/components/ui/radio/RadioListProfile";
import {CardSvg, EditSvg, PlusSvg} from "@/assets";
import UserAddressModal from "@/components/main/profile/modal/UserAddress";
import {usePostUserAddress} from "@/components/main/profile/hooks/usePostUserAddress";
import {usePostUpdateUserAddress} from "@/components/main/profile/hooks/usePostUpdateUserAddress";
import {useDeleteUserAddress} from "@/components/main/profile/hooks/useDeleteUserAddress";

const ProfileData = ({ userData, refetch }: { userData: ProfileInfo, refetch: () => void; }) => {
    const [addresses, setAddresses] = useState<UserAddress[]>();
    const [selectedAddressId, setSelectedAddressId] = useState<string>("");
    const [isEditOpen, setEditOpen] = useState(false);
    const [isEditPhoneOpen, setEditPhoneOpen] = useState(false);
    const [name, setName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    const [addressModalMode, setAddressModalMode] = useState<"add" | "edit">("add");
    const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined);

    const { mutateAsync: updatePhone } = usePostUserPhone();
    const { mutateAsync: updateUserInfo } = usePostUserInfoUpdate();
    const { mutateAsync: createUserAddress } = usePostUserAddress();
    const { mutateAsync: patchUserAddress } = usePostUpdateUserAddress();
    const { mutateAsync: deleteUserAddress } = useDeleteUserAddress();

    useEffect(() => {
        if (userData?.userProfile?.firstName && userData?.userProfile?.lastName && userData?.phone) {
            setName(userData.userProfile.firstName);
            setLastName(userData.userProfile.lastName);
            setPhone(userData.phone);
        }
    }, [userData]);

    useEffect(() => {
        if (userData?.userProfile?.addresses) {
            setAddresses(userData.userProfile?.addresses);
        }
    }, [userData]);

    useEffect(() => {
        if (userData?.userProfile?.addresses.length > 0 && !selectedAddressId) {
            const mainAddress = userData.userProfile?.addresses.find(addr => addr.isMain);
            setSelectedAddressId(mainAddress?.id || userData.userProfile?.addresses[0].id);
        }
    }, [userData]);

    const handleSave = async (newFirstName: string, newLastName: string) => {
        await updateUserInfo({ firstName: newFirstName, lastName: newLastName });
        setName(newFirstName);
        setLastName(newLastName);
        setEditOpen(false);
        refetch();
    };

    const handleSavePhone = async (newPhone: string, otp: string) => {
        await updatePhone({ phone: newPhone, otp });
        setPhone(newPhone);
        setEditPhoneOpen(false);
        refetch();
    };

    const handleEditAddress = async (address: Address) => {
        setEditingAddress(address);
        setAddressModalMode("edit");
        setAddressModalOpen(true);
    };

    const handleDeleteAddress = async (addressId: string) => {
        await deleteUserAddress(addressId);
        setAddresses((prev) => {
            if (!prev) return [];

            const updated = prev.filter((address) => address.id !== addressId);

            if (selectedAddressId === addressId && updated.length > 0) {
                setSelectedAddressId(updated[0].id);
            } else if (updated.length === 0) {
                setSelectedAddressId("");
            }

            return updated;
        });
    };

    const handleSaveAddress = async (address: Address) => {
        const userAddress = address as UserAddress;

        if (addressModalMode === "edit") {
            const { id, ...data } = userAddress;
            await patchUserAddress({ id, data });
            setAddresses((prev = []) => prev.map((a) => (a.id === id ? userAddress : a)));
        } else {
            const isFirst = !addresses || addresses.length === 0;
            const newAddress = await createUserAddress({ ...userAddress, isMain: isFirst });

            setAddresses((prev) => [...(prev || []), newAddress.data.data.address as UserAddress]);
            if (isFirst) setSelectedAddressId(newAddress.data.data.id);
            refetch();
        }

        setAddressModalOpen(false);
    };

    const handleMainAddressChange = async (newMainId: string) => {
        if (newMainId === selectedAddressId) return;

        if (!addresses) return;

        const prevMain = addresses.find(a => a.id === selectedAddressId);
        const newMain = addresses.find(a => a.id === newMainId);

        if (prevMain && newMain) {
            const { id: prevId, ...prevData } = prevMain;
            await patchUserAddress({
                id: prevId,
                data: { ...prevData, isMain: false }
            });

            const { id: newId, ...newData } = newMain;
            await patchUserAddress({
                id: newId,
                data: { ...newData, isMain: true }
            });

            setSelectedAddressId(newMainId);
            refetch();
        }
    };

    return (
        <>
            <div className="container_profile_data">
                <h1>Особисті дані</h1>

                <BoxProfile label="Ім'я" value={`${name} ${lastName}`} onEditClick={() => setEditOpen(true)} />
                <BoxProfile label="Телефон" value={userData?.phone || "+38 (063)433-89-57"} onEditClick={() => setEditPhoneOpen(true)} />
            </div>

            <div className="container_profile_address">
                <h2>Адреса</h2>

                {addresses && addresses.length > 0 && (
                    <RadioListProfile
                        options={addresses.map((address) => ({
                            id: address.id,
                            label: `${address.city}, ${address.street}, буд. ${address.house}${address.flat ? `, кв. ${address.flat}` : ""}${address.floor ? `, під'їзд ${address.floor}` : ""}${address.apartment ? `, поверх ${address.apartment}` : ""}`,
                            actions: (
                                <>
                                    <EditSvg onClick={() => handleEditAddress(address)} className="icon_profile_edit cursor-pointer" />
                                    <CardSvg onClick={() => handleDeleteAddress(address.id)} className="icon_profile_delete cursor-pointer" />
                                </>
                            ),
                        }))}
                        value={selectedAddressId}
                        onChange={handleMainAddressChange}
                    />
                )}

                <button className="btn_profile_add_address"
                    onClick={() => {
                        setAddressModalMode("add");
                        setAddressModalOpen(true);
                    }}
                >Додати адресу
                    <PlusSvg className="icon_profile_add cursor-pointer" />
                </button>
            </div>

            <div className="container_profile_social">
                <h2>Пов&#39;язані облікові записи</h2>
                <SocialProfileComponent />
            </div>

            <UserAddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setAddressModalOpen(false)}
                mode={addressModalMode}
                selectedAddress={editingAddress}
                onSave={handleSaveAddress}
            />

            <EditNameModal
                isOpen={isEditOpen}
                onClose={() => setEditOpen(false)}
                firstname={name!}
                lastName={lastName!}
                onSave={handleSave}
            />

            <EditPhoneModal
                isOpen={isEditPhoneOpen}
                onClose={() => setEditPhoneOpen(false)}
                phoneUser={phone!}
                onSave={handleSavePhone}
            />
        </>
    );
};

export default ProfileData;