import { useQuery } from "@tanstack/react-query";
import {BasketService} from "@/services/basket/basket.service";

export const useGetBasketProducts = () => {
    return useQuery({
        queryKey: ['product-basket'],
        queryFn: () => BasketService.getBasketProducts()
    });
};