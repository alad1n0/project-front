export type BasketContextType = {
    count: number | null;
    refresh: () => void;
    lastRefresh: number;
}

export interface BasketActions {
    productId: string;
    quantity: number;
    restaurantId: string;
    sessionId: string | null;
}