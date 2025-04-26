import { useMutation } from "@tanstack/react-query";
import {BasketActions} from "@/types/basket/interface";
import {BasketService} from "@/services/basket/basket.service";

export const useActionsBasket = () => {
    return useMutation({
        mutationKey: ['actions-basket'],
        mutationFn: (data: BasketActions) => BasketService.actionsBasket(data),
        onError: (error) => {
            console.error("Error restaurants actions:", error);
        },
        onSuccess: () => {
            console.log("Restaurants actions successfully");
        },
    });
};