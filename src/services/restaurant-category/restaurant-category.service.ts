import {getCategoryRestaurant, getTopCategoryRestaurant} from "@/config/api/api.config";
import instance from "@/services/api/interceptors.api";

export const RestaurantCategoryService = {
    getTopCategory: () => instance({
        url: getTopCategoryRestaurant(),
        method: 'GET'
    }),
    getCategory: () => instance({
        url: getCategoryRestaurant(),
        method: 'GET'
    }),
};