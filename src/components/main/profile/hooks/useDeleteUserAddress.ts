import { useMutation } from "@tanstack/react-query";
import {UserService} from "@/services/user/user.service";

export const useDeleteUserAddress = () => {
    return useMutation({
        mutationKey: ['delete-user-address'],
        mutationFn: (id: string) => UserService.deleteUserAddresses(id),
        onError: (error) => {
            console.error("Error while sending OTP:", error);
        },
        onSuccess: () => {
            console.log("OTP sent successfully");
        },
    });
};