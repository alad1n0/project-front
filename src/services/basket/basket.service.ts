import {actionsBasket, countProductBasket, getBasketProducts} from "@/config/api/api.config";
import instance from "@/services/api/interceptors.api";
import {BasketActions} from "@/types/basket/interface";

export const BasketService = {
    countProductBasket: () => instance({
        url: countProductBasket(),
        method: 'GET',
    }),
    actionsBasket: (data: BasketActions)=> instance({
        url: actionsBasket(),
        method: 'POST',
        data
    }),
    getBasketProducts: () => instance({
        url: getBasketProducts(),
        method: 'GET',
    }),
}