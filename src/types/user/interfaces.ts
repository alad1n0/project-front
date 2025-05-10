export interface ProfileInfo {
    id: string;
    phone: string;
    role: string;
    userProfile: {
        addresses: UserAddress[];
        firstName: string;
        lastName: string;
        address: string;
    },
}

export interface UserUpdateInfo {
    firstName: string;
    lastName: string;
}

export interface UserUpdatePhone {
    phone: string;
    otp: string;
}

export type Address = {
    city: string;
    locality: string | null;
    street: string;
    house: string;
    flat: string;
    floor: string;
    apartment: string;
    comment: string;
    type: string;
    isMain: boolean;
};

export interface UserAddress {
    id: string;
    city: string;
    locality: string | null;
    street: string;
    house: string;
    flat: string;
    floor: string;
    apartment: string;
    comment: string;
    type: string;
    isMain: boolean;
}