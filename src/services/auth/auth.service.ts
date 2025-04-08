import instance from "@/services/api/interceptors.api";
import { postAdminLogin, postAuthOauth, postAuthOtp, postAuthVerifyOtp } from "@/config/api/api.config";
import { OtpRequest, VerifyOtpRequest, LoginAdminRequest, OauthRequest } from "@/types/auth/interfaces";

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
    oauth: (data: OauthRequest) => instance({
        url: postAuthOauth(),
        method: 'POST',
        data: data,
    }),
    adminLogin: (data: LoginAdminRequest) => instance({
        url: postAdminLogin(),
        method: 'POST',
        data: data,
    })
};