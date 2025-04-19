import { useMutation } from "@tanstack/react-query";
import {UserService} from "@/services/user/user.service";
import {UserUpdateInfo} from "@/types/user/interfaces";

export const useUpdateProfileInfo = () => {
    return useMutation({
        mutationKey: ['update-user-profile'],
        mutationFn: (data: UserUpdateInfo) => UserService.updateUserInfo(data),
        onError: (error) => {
            console.error("Error restaurants actions:", error);
        },
        onSuccess: () => {
            console.log("Restaurants actions successfully");
        },
    });
};