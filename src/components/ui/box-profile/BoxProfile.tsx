import React from "react";
import { EditSvg } from "@/assets";

interface BoxProfileProps {
    label: string;
    value: string;
    onEditClick?: () => void;
}

const BoxProfile: React.FC<BoxProfileProps> = ({ label, value, onEditClick }) => {
    return (
        <div className="box_profile_data">
            <div className="box_text_profile_data">
                <p>{label}</p>
                <h2>{value}</h2>
            </div>
            <EditSvg className="icon_profile_edit cursor-pointer" onClick={onEditClick} />
        </div>
    );
};

export default BoxProfile;