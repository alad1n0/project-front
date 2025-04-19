"use client";

import React from "react";
import { ArrowSvg, SelectFilter } from "@/assets";
import {RestaurantCategory} from "@/types/restaurant-category/interface";

interface Props {
    selectedFood: string;
    isOpen: boolean;
    toggleDropdown: () => void;
    options: RestaurantCategory[];
    onSelect: (option: string) => void;
}

const FoodSelect: React.FC<Props> = ({selectedFood, isOpen, toggleDropdown, options, onSelect,}) => {
    return (
        <div className="box_select">
            <div
                className={`box_top_select ${isOpen ? "open" : ""}`}
                onClick={toggleDropdown}
            >
                <p className="text_selected">{selectedFood}</p>
                <ArrowSvg className="icon_arrow_select" />
            </div>
            {options.length > 0 && (
                <ul className={`dropdown_list ${isOpen ? "open" : ""}`}>
                    {options.map((option) => {
                        const isActive = selectedFood === option.name;
                        return (
                            <li
                                key={option.id ?? "all"}
                                className={`item_option_select ${isActive ? "active" : ""}`}
                                onClick={() => onSelect(option.name)}
                            >
                                <span>{option.name}</span>
                                {isActive && (
                                    <SelectFilter className="icon_select_filter" />
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default React.memo(FoodSelect);