import React from "react";
import {EditSvg} from "@/assets";

interface BoxProfileProps {
    label: string;
    value: string;
}

const BoxProfile: React.FC<BoxProfileProps> = ({ label, value }) => {
    return (
        <div className="box_profile_data">
            <div className="box_text_profile_data">
                <p>{label}</p>
                <h2>{value}</h2>
            </div>
            <EditSvg />
        </div>
    );
};

export default BoxProfile;