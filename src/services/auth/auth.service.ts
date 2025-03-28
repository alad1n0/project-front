import instance from "@/services/api/interceptors.api";
import { postAdminLogin, postAuthOtp, postAuthVerifyOtp } from "@/config/api/api.config";

interface OtpRequest {
    phone: string;
}

interface VerifyOtpRequest {
    phone: string;
    code: string;
}

interface LoginAdmin {
    email: string,
    password: string
}

export const AuthService = {
    otp: (data: OtpRequest) => instance({
        url: postAuthOtp(),
        method: 'POST',
        data: data,
    }),
    verifyOtp: (data: VerifyOtpRequest) => instance({
        url: postAuthVerifyOtp(),
        method: 'POST',
        data: data,
    }),
    adminLogin: (data: LoginAdmin) => instance({
        url: postAdminLogin(),
        method: 'POST',
        data: data,
    }),
};
