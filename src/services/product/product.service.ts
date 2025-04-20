import instance from "@/services/api/interceptors.api";
import {getProductRestaurant, getProductRestaurantCategory} from "@/config/api/api.config";
import {ProductParams} from "@/types/product/interface";

export const ProductService = {
    getProductRestaurantCategory: (id: string) => instance({
        url: getProductRestaurantCategory(id),
        method: 'GET',
    }),
    getRestaurantProductList: (id: string, params: ProductParams) => instance({
        url: getProductRestaurant(id),
        method: 'GET',
        params
    }),
};