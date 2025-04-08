import { useMutation } from "@tanstack/react-query";
import {FavoritesService} from "@/services/favorites/favorites.service";
import {ActionsFavoriteData} from "@/types/favorites/interfaces";

export const useActionsFavorite = () => {
    return useMutation({
        mutationKey: ['actions-favorite'],
        mutationFn: (data: ActionsFavoriteData) => FavoritesService.actionsFavorite(data),
        onError: (error) => {
            console.error("Error restaurants actions:", error);
        },
        onSuccess: () => {
            console.log("Restaurants actions successfully");
        },
    });
};