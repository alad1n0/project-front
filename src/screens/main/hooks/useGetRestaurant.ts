import {useMutation, useQuery} from "@tanstack/react-query";
import { RestaurantService } from "@/services/restaurant/restaurant.service";

export const useGetRestaurant = (id: string) => {
    return useQuery({
        queryKey: ['get-restaurant', id],
        queryFn: () => RestaurantService.getOneRestaurant(id)
    });
};