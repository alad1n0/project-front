"use client"

import React, {useEffect, useState} from "react";
import BoxProfile from "@/components/ui/box-profile/BoxProfile";
import SocialProfileComponent from "@/components/main/profile/social/SocialProfileComponent";
import {ProfileInfo} from "@/types/user/interfaces";
import EditNameModal from "@/components/main/profile/modal/UserInfoUpdate";
import EditPhoneModal from "@/components/main/profile/modal/UserPhoneUpdate";
import {usePostUserPhone} from "@/components/main/profile/hooks/usePostUserPhone";
import {usePostUserInfoUpdate} from "@/components/main/profile/hooks/usePostUserInfoUpdate";

const ProfileData = ({ userData, refetch }: { userData: ProfileInfo, refetch: () => void; }) => {
    const [isEditOpen, setEditOpen] = useState(false);
    const [isEditPhoneOpen, setEditPhoneOpen] = useState(false);
    const [name, setName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);

    const { mutateAsync: updatePhone } = usePostUserPhone();
    const { mutateAsync: updateUserInfo } = usePostUserInfoUpdate();

    useEffect(() => {
        if (userData?.userProfile?.firstName && userData?.userProfile?.lastName && userData?.phone) {
            setName(userData.userProfile.firstName);
            setLastName(userData.userProfile.lastName);
            setPhone(userData.phone);
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

    return (
        <>
            <div className="container_profile_data">
                <h1>Особисті дані</h1>

                <BoxProfile label="Ім'я" value={`${name} ${lastName}`} onEditClick={() => setEditOpen(true)} />
                <BoxProfile label="Телефон" value={userData?.phone || "+38 (063)433-89-57"} onEditClick={() => setEditPhoneOpen(true)} />
            </div>
            <div className="container_profile_social">
                <h2>Пов&#39;язані облікові записи</h2>
                <SocialProfileComponent />
            </div>

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