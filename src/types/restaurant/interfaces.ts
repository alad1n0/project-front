export type GetRestaurantListParams = {
    page: number;
    limit: number;
};

export interface Restaurant {
    id: string;
    name: string;
    banner: string;
    rating: number;
    workingHours: string;
    cookingTime: string;
    deliveryPrice: string;
    isFavorite: boolean;
}

export interface RestaurantListProps {
    restaurants: Restaurant[];
    toggleFavorite: (id: string) => void;
}

export interface OneRestaurant {
    id: string;
    name: string;
    address: string;
    numberOfWorkers: number;
    description: string;
    banner: string;
    logo: string;
    rating: number;
    workingHours: string;
    cookingTime: string;
    deliveryPrice: string;
    minimumOrderPrice: string;
}