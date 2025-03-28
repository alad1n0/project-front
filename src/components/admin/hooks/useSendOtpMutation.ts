// import { useMutation } from "@tanstack/react-query";
// import { AuthService } from "@/services/auth/auth.service"; 

// export const useAdminLoginMutation = () => {
//     return useMutation({
//         mutationKey: ['admin-login'],
//         mutationFn: (data: { email: string, password: string }) => AuthService.adminLogin(data),
//         onError: (error) => {
//             console.error("Error while sending OTP:", error);
//         },
//         onSuccess: () => {
//             console.log("OTP sent successfully");
//         },
//     });
// };