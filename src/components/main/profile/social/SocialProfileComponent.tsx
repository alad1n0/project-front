import React, { useState } from 'react';
import {CloseSvg, FacebookSvg, GoogleSvg} from "@/assets";

const SocialProfileComponent = () => {
    const [isFacebookConnected, setIsFacebookConnected] = useState(false);
    const [isGoogleConnected, setIsGoogleConnected] = useState(true);

    const toggleFacebookConnection = () => {
        setIsFacebookConnected(!isFacebookConnected);
    };

    const toggleGoogleConnection = () => {
        setIsGoogleConnected(!isGoogleConnected);
    };

    return (
        <>
            <div className="box_profile_social">
                <div className="item_profile_social">
                    <FacebookSvg className="icon_profile_social" />
                    <div className="profile_social_media_item">
                        <h3>Facebook</h3>
                        {isFacebookConnected && <p>Приєднано</p>}
                    </div>
                </div>
                <div onClick={toggleFacebookConnection} className="box_profile_social_add">
                    {isFacebookConnected ? <CloseSvg className="icon_profile_close" /> : <p>Підключити</p>}
                </div>
            </div>

            <div className="box_profile_social">
                <div className="item_profile_social">
                    <GoogleSvg className="icon_profile_social" />
                    <div className="profile_social_media_item">
                        <h3>Google</h3>
                        {isGoogleConnected && <p>Приєднано</p>}
                    </div>
                </div>
                <div onClick={toggleGoogleConnection} className="box_profile_social_add">
                    {isGoogleConnected ? <CloseSvg className="icon_profile_close" /> : <p>Підключити</p>}
                </div>
            </div>
        </>
    );
};

export default SocialProfileComponent;