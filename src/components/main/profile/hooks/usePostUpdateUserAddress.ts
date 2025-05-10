import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/services/user/user.service";
import { Address } from "@/types/user/interfaces";

export const usePostUpdateUserAddress = () => {
    return useMutation({
        mutationKey: ['update-user-address'],
        mutationFn: ({ id, data }: { id: string; data: Address }) =>
            UserService.updateUserAddress(id, data),
        onError: (error) => {
            console.error("Error while updating address:", error);
        },
        onSuccess: () => {
            console.log("Address updated successfully");
        },
    });
};