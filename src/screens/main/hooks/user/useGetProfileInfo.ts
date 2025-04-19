import { useQuery } from "@tanstack/react-query";
import {UserService} from "@/services/user/user.service";
import { ProfileInfo } from "@/types/user/interfaces";

export const useGetProfileInfo = () => {
    return useQuery<ProfileInfo>({
        queryKey: ['get-user-info'],
        queryFn: async () => {
            const response = await UserService.getUserInfo();
            return response.data.data;
        }
    });
};