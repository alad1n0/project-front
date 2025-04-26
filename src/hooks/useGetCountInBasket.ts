import {useQuery} from "@tanstack/react-query";
import {BasketService} from "@/services/basket/basket.service";

export const useGetCountInBasket = () => {
    return useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            const res = await BasketService.countProductBasket();
            return res.data;
        },
    });
}