"use client";

import { useState } from "react";
import { ArrowSvg, LocationSvg } from "@/assets";

const cities = ["Івано-Франківськ", "Львів", "Дрогобич / Трускавець"];

const CitySelector = () => {
    const [selectedCity, setSelectedCity] = useState(cities[0]);
    const [cityMenuOpen, setCityMenuOpen] = useState(false);

    const toggleMenu = () => setCityMenuOpen((prev) => !prev);

    const selectCity = (city: string) => {
        setSelectedCity(city);
        setCityMenuOpen(false);
    };

    return (
        <div className="container_location_header">
            <div className="box_icon_location">
                <LocationSvg className="icon_location_header" />
                <div className="box_text_location" onClick={toggleMenu}>
                    <p className="text_top_location">Ваше місто</p>
                    <div className="box_text_bottom_location">
                        <p className="text_bottom_location">{selectedCity}</p>
                        <ArrowSvg className={`icon_arrow_bottom_location ${cityMenuOpen ? "rotate" : ""}`} />
                    </div>
                </div>
            </div>

            <div className={`container_list_cities_header ${cityMenuOpen ? "open" : ""}`}>
                {cities.map((city) => (
                    <button
                        key={city}
                        className={`link_cities_header ${selectedCity === city ? "active" : ""}`}
                        onClick={() => selectCity(city)}
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CitySelector;