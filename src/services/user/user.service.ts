import instance from "@/services/api/interceptors.api";
import {
    createUserAddress, deleteUserAddresses,
    getUserInfo,
    updateUserAddress,
    updateUserInfo,
    updateUserPhone
} from "@/config/api/api.config";
import {Address, UserAddress, UserUpdateInfo, UserUpdatePhone} from "@/types/user/interfaces";

export const UserService = {
    getUserInfo: () => instance({
        url: getUserInfo(),
        method: 'GET'
    }),
    updateUserInfo: (data: UserUpdateInfo) => instance({
        url: updateUserInfo(),
        method: 'POST',
        data
    }),
    updateUserPhone: (data: UserUpdatePhone) => instance({
        url: updateUserPhone(),
        method: 'POST',
        data
    }),
    createUserAddress: (data: Address) => instance({
        url: createUserAddress(),
        method: 'POST',
        data
    }),
    updateUserAddress: (id: string, data: Address) => instance({
        url: updateUserAddress(id),
        method: 'POST',
        data
    }),
    deleteUserAddresses: (id: string) => instance({
        url: deleteUserAddresses(id),
        method: 'DELETE'
    }),
};