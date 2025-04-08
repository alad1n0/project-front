import React from "react";
import BoxProfile from "@/components/ui/box-profile/box-profile";
import SocialProfileComponent from "@/components/main/profile/social/SocialProfileComponent";

const ProfileData = () => {
    return (
        <>
            <div className="container_profile_data">
                <h1>Особисті дані</h1>

                <BoxProfile label="Ім'я" value="Андрій Коваленко" />
                <BoxProfile label="Телефон" value="+38 (063)433-89-57" />

                {/*<div className="box_profile_data">*/}
                {/*    /!*<label className="label_profile_data">*!/*/}
                {/*    /!*    <input type="radio"/>*!/*/}
                {/*    /!*</label>*!/*/}
                {/*</div>*/}
            </div>
            <div className="container_profile_social">
                <h2>Пов&#39;язані облікові записи</h2>
                <SocialProfileComponent />
            </div>
        </>
    );
};

export default ProfileData;