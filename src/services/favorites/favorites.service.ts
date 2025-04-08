import instance from "@/services/api/interceptors.api";
import {actionsFavorite} from "@/config/api/api.config";
import {ActionsFavoriteData} from "@/types/favorites/interfaces";

export const FavoritesService = {
    actionsFavorite: (data: ActionsFavoriteData) => instance({
        url: actionsFavorite(),
        method: 'POST',
        data,
    })
};