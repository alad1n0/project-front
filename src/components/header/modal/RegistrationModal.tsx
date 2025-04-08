import React, { useEffect, useState } from "react";
import { CloseSvg, FacebookSvg, GoogleSvg } from "@/assets";
import OTPInputFields from "@/components/ui/input/OtpInput";
import {useSendOtpMutation} from "@/components/header/hooks/useSendOtpMutation";
import {useVerifyOtpMutation} from "@/components/header/hooks/useVerifyOtpMutation";
import {useRouter} from "next/navigation";
import {useAuth} from "@/provider/AuthProvider";
import {signIn, signOut, useSession} from "next-auth/react";
import {useQueryClient} from "@tanstack/react-query";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationForm: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { login } = useAuth();
    const [phoneEntered, setPhoneEntered] = useState(false);
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [phone, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const [userInfoStep, setUserInfoStep] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const queryClient = useQueryClient()
    const { data: session } = useSession();

    const { mutateAsync: sendOtp } = useSendOtpMutation();
    const { mutateAsync: verifyOtp } = useVerifyOtpMutation();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        if (phoneEntered && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen, phoneEntered, timer]);

    useEffect(() => {
        if (timer <= 0) {
            setCanResend(true);
        }
    }, [timer]);

    useEffect(() => {
        if (typeof window !== "undefined" && session?.access_token) {
            localStorage.setItem("access_token", session.access_token);
            signOut();
        }
    }, [session?.access_token]);

    if (!isOpen) return null;

    const validatePhoneNumber = (phone: string) => {
        const phoneRegex = /^\+?380\s?[\(]?[0-9]{2}[\)]?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
        return phoneRegex.test(phone);
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

    const handleOTPComplete = async () => {
        const code = otp.join("");

        try {
            const response = await verifyOtp({ phone, code });

            if (response?.data?.data.access_token && response?.data?.data.refresh_token) {
                setAccessToken(response.data.data.access_token);
                setRefreshToken(response.data.data.refresh_token);
                setUserInfoStep(true);
            }
        } catch (error) {
            console.error("Помилка при верифікації OTP:", error);
        }
    };

    const handleUserInfoSubmit = async () => {
        try {


            login(accessToken, refreshToken);
            router.push("/profile");
            onClose();
            resetState();
        } catch (error) {
            console.error("Помилка при збереженні інформації:", error);
        }
    };

    const resetState = () => {
        setPhoneEntered(false);
        setUserInfoStep(false);
        setPhoneNumber("");
        setOtp(new Array(4).fill(""));
        setFirstName("");
        setLastName("");
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

    const googleAuth = async () => {
        await signIn('google')
            .then(() => queryClient.resetQueries())
    }

    const facebookAuth = async () => {
        await signIn('facebook')
            .then(() => queryClient.resetQueries())
    }

    return (
        <>
            <div className={`mobile-menu-overlay ${isOpen ? "active" : ""}`} onClick={onClose}></div>
            <div className="register-modal-container">
                <div className="modal-container">
                    <div className="modal-header">
                        <h3>Вхід</h3>
                        <button type="button" className="close_button" onClick={onClose}>
                            <CloseSvg className="icon_close_modal" />
                        </button>
                    </div>

                    {userInfoStep ? (
                        <>
                            <div className="modal-body">
                                <h3>Як вас звати?</h3>
                            </div>
                            <div>
                                <div className="form-group">
                                    <label className="control-label">Ім’я</label>
                                    <input
                                        type="text"
                                        placeholder="Введіть ім’я"
                                        value={firstName}
                                        className="form-control"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Прізвище</label>
                                    <input
                                        type="text"
                                        placeholder="Введіть прізвище"
                                        value={lastName}
                                        className="form-control"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <button onClick={handleUserInfoSubmit} className="continue-button">Зареєструватись</button>
                            </div>
                        </>
                    ) : phoneEntered ? (
                        <>
                            <div className="modal-body">
                                <h3>Код підтвердження</h3>
                                <p>На <strong>{phone}</strong> був <br/> надісланий код для підтвердження</p>
                            </div>
                            <div className="modal-footer">
                                <OTPInputFields otp={otp} setOtp={setOtp} />
                                <button onClick={handleOTPComplete} className="continue-button">Підтвердити</button>
                                <div className="modal-end">
                                    {timer > 0 ? (
                                        <p>Відправити код повторно: <strong>через {formatTime(timer)} хв</strong></p>
                                    ) : (
                                        <p
                                            onClick={handleResendCode}
                                            style={{ cursor: "pointer", textDecoration: "underline" }}
                                        >
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
                            <div className="modal-body">
                                <h3>Ласкаво просимо</h3>
                                <p>Увійти по номеру телефону</p>
                            </div>
                            <div>
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
                            </div>
                            <div className="decoration_line_horizontal"></div>
                            <div className="social-login">
                                <p>Увійти через соціальні мережі:</p>
                                <div className="social-buttons">
                                    <button className="social-btn" onClick={facebookAuth}>
                                        <FacebookSvg className="social-btn-icon" />
                                    </button>
                                    <button className="social-btn" onClick={googleAuth}>
                                        <GoogleSvg className="social-btn-icon" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default RegistrationForm;