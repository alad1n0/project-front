import { useQuery } from "@tanstack/react-query";
import {RestaurantCategoryService} from "@/services/restaurant-category/restaurant-category.service";

export const useGetTopRestaurantCategory = () => {
    return useQuery({
        queryKey: ['get-top'],
        queryFn: RestaurantCategoryService.getTopCategory,
    });
};