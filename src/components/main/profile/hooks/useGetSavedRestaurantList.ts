import { useQuery } from "@tanstack/react-query";
import { RestaurantService } from "@/services/restaurant/restaurant.service";

export const useGetSavedRestaurantList = () => {
    return useQuery({
        queryKey: ['get-all-favorites'],
        queryFn: RestaurantService.getSavedReRestaurants
    });
};