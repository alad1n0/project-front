"use client";

import React, {useEffect, useState} from "react";
import Modal from "@/components/ui/modal/Modal";
import {CloseSvg} from "@/assets";
import OTPInputFields from "@/components/ui/input/OtpInput";
import {useSendOtpMutation} from "@/components/header/hooks/useSendOtpMutation";

interface EditPhoneModalProps {
    isOpen: boolean;
    onClose: () => void;
    phoneUser: string;
    onSave: (newPhone: string, otp: string) => void;
}

const EditPhoneModal = ({ isOpen, onClose, phoneUser, onSave }: EditPhoneModalProps) => {
    const [phoneEntered, setPhoneEntered] = useState(false);
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [timer, setTimer] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const [error, setError] = useState("");
    const [phone, setPhoneNumber] = useState("");

    const { mutateAsync: sendOtp } = useSendOtpMutation();

    useEffect(() => {
        setPhoneNumber(phoneUser);
    }, [phoneUser]);

    useEffect(() => {
        if (phoneEntered && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [phoneEntered, timer]);

    useEffect(() => {
        if (timer <= 0) {
            setCanResend(true);
        }
    }, [timer]);

    const validatePhoneNumber = (phone: string) => {
        const phoneRegex = /^\+380\d{9}$/;
        return phoneRegex.test(phone.replace(/\s|\(|\)|-/g, ""));
    };

    const handlePhoneSubmit = () => {
        if (!validatePhoneNumber(phone)) {
            setError("");
            return;
        }

        setError("");
        setPhoneEntered(true);
        sendOtp({phone});
    };

    const handleSave = () => {
        onSave(phone, otp.join(""));
        onClose();
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const handleResendCode = () => {
        if (canResend) {
            setTimer(120);
            setCanResend(false);
            sendOtp({phone});
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-header">
                <h3>Змінити мобільний телефон</h3>
                <button type="button" className="close_button" onClick={onClose}>
                    <CloseSvg className="icon_close_modal" />
                </button>
            </div>

            {phoneEntered ? (
                <>
                    <div className="modal-body">
                        <h3>Код підтвердження</h3>
                        <p>На <strong>{phone}</strong> був <br/> надісланий код для підтвердження</p>
                    </div>
                    <div className="modal-footer">
                        <OTPInputFields otp={otp} setOtp={setOtp} />
                        <button onClick={handleSave} className="continue-button">Підтвердити</button>
                        <div className="modal-end">
                            {timer > 0 ? (
                                <p>Відправити код повторно: <strong>через {formatTime(timer)} хв</strong></p>
                            ) : (
                                <p onClick={handleResendCode} style={{ cursor: "pointer", textDecoration: "underline" }}>
                                    <strong>Відправити код повторно</strong>
                                </p>
                            )}
                            <button
                                onClick={() => setPhoneEntered(false)}
                                className="back-button"
                            >
                                Назад
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="form-group">
                        <label className="control-label">Мобільний телефон</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="+38 (063) 000-00-00"
                            className={`form-control ${error ? "error" : ""}`}
                            value={phone}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <button onClick={handlePhoneSubmit} className="continue-button">Продовжити</button>
                </>
            )}
        </Modal>
    );
};

export default EditPhoneModal;