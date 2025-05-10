"use client";

import React from "react";
import { cn } from "@/helpers/cn";

interface Option<T> {
    label: string;
    value: T;
}

interface ToggleButtonGroupProps<T extends string> {
    value: T;
    onChange: (val: T) => void;
    options: Option<T>[];
    className?: string;
}

export function ToggleButtonGroup<T extends string>({value, onChange, options, className,}: ToggleButtonGroupProps<T>) {
    return (
        <div className={cn("box_btn_toggle_form", className)}>
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={cn("btn_toggle_form", { active: value === option.value })}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}