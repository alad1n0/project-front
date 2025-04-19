import { useQuery } from "@tanstack/react-query";
import { RestaurantService } from "@/services/restaurant/restaurant.service";
import { GetRestaurantListParams } from "@/types/restaurant/interfaces";

export const useGetRestaurantList = (params: GetRestaurantListParams) => {
    return useQuery({
        queryKey: ['get-restaurants', params],
        queryFn: () => RestaurantService.getRestaurantList(params)
    });
};