import instance from "@/services/api/interceptors.api";
import {getFavoriteRestaurants, getRestaurantById, getRestaurantList, getTopRestaurants} from "@/config/api/api.config";
import { GetRestaurantListParams } from "@/types/restaurant/interfaces";

export const RestaurantService = {
    getRestaurantList: (params: GetRestaurantListParams) => instance({
        url: getRestaurantList(),
        method: 'GET',
        params,
    }),
    getTopRestaurants: () => instance({
        url: getTopRestaurants(),
        method: 'GET',
    }),
    getSavedReRestaurants: () => instance({
        url: getFavoriteRestaurants(),
        method: 'GET',
    }),
    getOneRestaurant: (id: string) => instance({
        url: getRestaurantById(id),
        method: 'GET',
    }),
};