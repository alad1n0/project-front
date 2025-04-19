import { useQuery } from "@tanstack/react-query";
import {RestaurantCategoryService} from "@/services/restaurant-category/restaurant-category.service";

export const useGetRestaurantCategory = () => {
    return useQuery({
        queryKey: ['get-all'],
        queryFn: RestaurantCategoryService.getCategory,
    });
};