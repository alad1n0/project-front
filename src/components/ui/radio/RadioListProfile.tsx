"use client";

import React from "react";
import { cn } from "@/helpers/cn";

interface RadioProfileOption {
    id: string;
    label: string;
    actions?: React.ReactNode;
}

interface RadioListProfileProps {
    options: RadioProfileOption[];
    value: string;
    onChange: (id: string) => void;
    name?: string;
    className?: string;
    children?: React.ReactNode;
}

export const RadioListProfile: React.FC<RadioListProfileProps> = ({ options, value, onChange, name = "radio-group", className, children }) => {
    return (
        <div className={cn("container_radio_address", className)}>
            {options.map((option, index) => (
                <React.Fragment key={option.id}>
                    <div className="flex items-center justify-between">
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
                        <div className="flex gap-[10px]">{option.actions}</div>
                    </div>
                    {index < options.length - 1 && <div className="decoration_line_checkout" />}
                </React.Fragment>
            ))}
        </div>
    );
};