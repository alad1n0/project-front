import React from "react";

interface MenuItemProps {
    title: string;
    Icon: React.ElementType;
    ArrowIcon?: React.ElementType;
    SelectedIcon: React.ElementType;
    isSelected?: boolean;
    onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, Icon, ArrowIcon, SelectedIcon, isSelected, onClick }) => {
    return (
        <div
            className={`profile_menu ${isSelected ? "selected" : ""}`}
            onClick={onClick}
        >
            <div className="menu_container">
                {isSelected ? (
                    <SelectedIcon className={`profile_menu_icon ${isSelected ? "selected_icon_fill" : ""}`} />
                ) : (
                    <Icon className={`profile_menu_icon ${isSelected ? "selected_icon" : ""}`} />
                )}
                <p className={isSelected ? "selected_text" : ""}>{title}</p>
            </div>
            {ArrowIcon && <ArrowIcon className={`menu_arrow_icon ${isSelected ? "selected_icon" : ""}`} />}
        </div>
    );
};

export default MenuItem;