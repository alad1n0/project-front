"use client";

import { ArrowSvg } from "@/assets";

interface AddressSelectProps {
    id: string;
    data: string[];
    value: string;
    onChange: (value: string) => void;
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
}

const AddressSelect = ({ data, value, onChange, className, isOpen, onToggle }: AddressSelectProps) => {
    const selectCity = (city: string) => {
        onChange(city);
        onToggle();
    };

    return (
        <div className="container_location_header">
            <div className="box_icon_city_location">
                <div className="box_text_city_location" onClick={onToggle}>
                    <div className={`box_text_bottom_city_location ${isOpen ? "active" : ""} ${className}`}>
                        <p className="text_bottom_city_location">
                            {value || "Оберіть місто"}
                        </p>
                        <ArrowSvg className={`icon_arrow_bottom_location ${isOpen ? "rotate" : ""}`} />
                    </div>
                </div>
            </div>

            <div className={`container_list_cities_header_city ${isOpen ? "open" : ""}`}>
                {data.map((city) => (
                    <button
                        key={city}
                        className={`link_cities_header ${value === city ? "active" : ""}`}
                        onClick={() => selectCity(city)}
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AddressSelect;