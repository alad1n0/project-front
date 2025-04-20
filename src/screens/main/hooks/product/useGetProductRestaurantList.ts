import { useQuery } from "@tanstack/react-query";
import {ProductService} from "@/services/product/product.service";
import {ProductParams} from "@/types/product/interface";

export const useGetProductRestaurantList = (id: string, params: ProductParams) => {
    return useQuery({
        queryKey: ['get-product-restaurants', id],
        queryFn: () => ProductService.getRestaurantProductList(id, params)
    });
};