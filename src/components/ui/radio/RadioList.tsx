"use client";

import React from "react";
import { cn } from "@/helpers/cn";

interface RadioOption {
    id: string;
    label: string;
}

interface RadioListProps {
    options: RadioOption[];
    value: string;
    onChange: (id: string) => void;
    name?: string;
    className?: string;
    showDivider?: boolean;
}

export const RadioList: React.FC<RadioListProps> = ({options, value, onChange, name = "radio-group", className, showDivider = true}) => {
    return (
        <div className={cn("container_radio_address", className)}>
            {options.map((option, index) => (
                <React.Fragment key={option.id}>
                    <div>
                        <input
                            className="radio_input_address"
                            type="radio"
                            id={option.id}
                            name={name}
                            checked={value === option.id}
                            onChange={() => onChange(option.id)}
                        />
                        <label className="radio_label_address" htmlFor={option.id}>
                            <span className="radio_inner_circle_address"></span>
                            <span className="text_radio_label_address">{option.label}</span>
                        </label>
                    </div>
                    {showDivider && index < options.length - 1 && (
                        <div className="decoration_line_checkout" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};