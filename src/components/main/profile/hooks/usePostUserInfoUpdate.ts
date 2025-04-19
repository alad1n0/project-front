import { useMutation } from "@tanstack/react-query";
import {UserService} from "@/services/user/user.service";
import {UserUpdateInfo} from "@/types/user/interfaces";

export const usePostUserInfoUpdate = () => {
    return useMutation({
        mutationKey: ['update-user-profile'],
        mutationFn: (data: UserUpdateInfo) => UserService.updateUserInfo(data),
        onError: (error) => {
            console.error("Error while sending OTP:", error);
        },
        onSuccess: () => {
            console.log("OTP sent successfully");
        },
    });
};