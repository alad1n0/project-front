import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/auth/auth.service";

export const useSendOauthMutation = () => {
    return useMutation({
        mutationKey: ['send-otp'],
        mutationFn: (data: { phone: string }) => AuthService.otp(data),
        onError: (error) => {
            console.error("Error while sending OTP:", error);
        },
        onSuccess: () => {
            console.log("OTP sent successfully");
        },
    });
};