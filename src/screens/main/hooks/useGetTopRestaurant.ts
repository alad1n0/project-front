import { useQuery } from "@tanstack/react-query";
import { RestaurantService } from "@/services/restaurant/restaurant.service";

export const useGetTopRestaurant = () => {
    return useQuery({
        queryKey: ['get-top-restaurants'],
        queryFn: RestaurantService.getTopRestaurants,
    });
};