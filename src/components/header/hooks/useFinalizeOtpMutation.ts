import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/auth/auth.service";
import { FinalizeOtpRequest } from "@/types/auth/interfaces";

export const useFinalizeOtpMutation = () => {
    return useMutation({
        mutationKey: ['finalize-otp'],
        mutationFn: (data: FinalizeOtpRequest) => AuthService.finalizeOtp(data),
        onError: (error) => {
            console.error("Error while sending OTP:", error);
        },
        onSuccess: () => {
            console.log("OTP sent successfully");
        },
    });
};