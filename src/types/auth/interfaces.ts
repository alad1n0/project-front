export interface OtpRequest {
    phone: string;
}

export interface VerifyOtpRequest {
    phone: string;
    code: string;
}

export interface FinalizeOtpRequest {
    phone: string;
    firstName: string;
    lastName: string;
}

export interface LoginAdminRequest {
    email: string;
    password: string;
}

export interface OauthRequest {
    provider: string;
    providerId: string;
    email: string;
}