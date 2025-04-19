"use client";

import React from "react";
import { ArrowSvg, SelectFilter } from "@/assets";

interface Props {
    selectedSort: string;
    isOpen: boolean;
    toggleDropdown: () => void;
    options: string[];
    onSelect: (option: string) => void;
}

const SortSelect: React.FC<Props> = ({selectedSort, isOpen, toggleDropdown, options, onSelect}) => {
    return (
        <div className="box_select">
            <div
                className={`box_top_select ${isOpen ? "open" : ""}`}
                onClick={toggleDropdown}
            >
                <p className="text_selected">{selectedSort}</p>
                <ArrowSvg className="icon_arrow_select" />
            </div>
            <ul className={`dropdown_list ${isOpen ? "open" : ""}`}>
                {options.map((option) => {
                    const isActiveSort = selectedSort === option;
                    return (
                        <li
                            key={option}
                            className={`item_option_select ${isActiveSort ? "active" : ""}`}
                            onClick={() => onSelect(option)}
                        >
                            <span>{option}</span>
                            {isActiveSort && (
                                <SelectFilter className="icon_select_filter" />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default React.memo(SortSelect);
