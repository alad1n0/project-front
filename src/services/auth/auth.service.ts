import instance from "@/services/api/interceptors.api";
import {postAdminLogin, postAuthOauth, postAuthOtp, postAuthVerifyOtp, postFinalizeOtp} from "@/config/api/api.config";
import {
    OtpRequest,
    VerifyOtpRequest,
    LoginAdminRequest,
    OauthRequest,
    FinalizeOtpRequest
} from "@/types/auth/interfaces";

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
    finalizeOtp: (data: FinalizeOtpRequest) => instance({
        url: postFinalizeOtp(),
        method: 'POST',
        data: data,
    }),
    adminLogin: (data: LoginAdminRequest) => instance({
        url: postAdminLogin(),
        method: 'POST',
        data: data,
    })
};