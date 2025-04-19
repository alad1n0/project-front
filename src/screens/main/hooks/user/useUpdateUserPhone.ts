import { useMutation } from "@tanstack/react-query";
import {UserService} from "@/services/user/user.service";
import {UserUpdatePhone} from "@/types/user/interfaces";

export const useUpdateUserPhone = () => {
    return useMutation({
        mutationKey: ['update-user-phone'],
        mutationFn: (data: UserUpdatePhone) => UserService.updateUserPhone(data),
        onError: (error) => {
            console.error("Error restaurants actions:", error);
        },
        onSuccess: () => {
            console.log("Restaurants actions successfully");
        },
    });
};