import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/auth/auth.service";

export const useVerifyOtpMutation = () => {
    return useMutation({
        mutationKey: ['verify-otp'],
        mutationFn: (data: { phone: string, code: string }) => AuthService.verifyOtp(data),
        onError: (error) => {
            console.error("Error while verifying OTP:", error);
        },
        onSuccess: () => {
            console.log("OTP verified successfully");
        },
    });
};
