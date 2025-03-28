"use client";

import React, { useRef } from "react";

interface OTPInputFieldsProps {
    otp: string[];
    setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}

const OTPInputFields: React.FC<OTPInputFieldsProps> = ({ otp, setOtp }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").slice(0, 4).split("");
        setOtp([...paste, ...new Array(4 - paste.length).fill("")]);

        paste.forEach((char, i) => {
            if (inputRefs.current[i]) {
                inputRefs.current[i]!.value = char;
            }
        });
    };

    return (
        <div className="inputs">
            {otp.map((num, index) => (
                <input
                    key={index}
                    type="text"
                    name={`n${index + 1}`}
                    maxLength={1}
                    value={num}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleBackspace(index, e)}
                    onPaste={handlePaste}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    className="otp-input"
                />
            ))}
        </div>
    );
};

export default OTPInputFields;