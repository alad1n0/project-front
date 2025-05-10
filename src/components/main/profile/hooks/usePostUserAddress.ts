import { useMutation } from "@tanstack/react-query";
import {UserService} from "@/services/user/user.service";
import {Address} from "@/types/user/interfaces";

export const usePostUserAddress = () => {
    return useMutation({
        mutationKey: ['create-user-address'],
        mutationFn: (data: Address) => UserService.createUserAddress(data),
        onError: (error) => {
            console.error("Error while sending OTP:", error);
        },
        onSuccess: () => {
            console.log("OTP sent successfully");
        },
    });
};