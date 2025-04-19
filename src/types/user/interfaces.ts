export interface ProfileInfo {
    id: string;
    phone: string;
    role: string;
    userProfile: {
        firstName: string;
        lastName: string;
        address: string;
    }
}

export interface UserUpdateInfo {
    firstName: string;
    lastName: string;
}

export interface UserUpdatePhone {
    phone: string;
    otp: string;
}

export interface UserUpdateAddress {
    address: string;
}