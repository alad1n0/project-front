import instance from "@/services/api/interceptors.api";
import {getUserInfo, updateUserInfo, updateUserPhone} from "@/config/api/api.config";
import {UserUpdateInfo, UserUpdatePhone} from "@/types/user/interfaces";

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
};