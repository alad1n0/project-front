"use client";

import React from "react";
import { cn } from "@/helpers/cn";

interface FormInputLabelProps {
    id: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInputLabel: React.FC<FormInputLabelProps> = ({id, label, placeholder, required = false, className, value, defaultValue, onChange}) => {
    return (
        <label htmlFor={id} className={cn("label_form_checkout", className)}>
            <span className={cn("text_label_form_checkout", { label_form_checkout_required: required })}>
                {label}
            </span>
            <input
                type="text"
                id={id}
                className="input_form_checkout"
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                readOnly={!onChange}
            />
        </label>
    );
};