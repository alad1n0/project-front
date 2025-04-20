import { useQuery } from "@tanstack/react-query";
import {ProductService} from "@/services/product/product.service";

export const useProductRestaurantCategory = (id: string) => {
    return useQuery({
        queryKey: ['get-product-restaurants-category', id],
        queryFn: () => ProductService.getProductRestaurantCategory(id)
    });
};