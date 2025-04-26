export interface CategoryProduct {
    id: string;
    name: string;
    subcategories: SubcategoryProduct[];
    sizes: SizeProduct[];
}

export interface SubcategoryProduct {
    id: string;
    name: string;
}

export interface SizeProduct {
    id: string;
    size: string;
}

export type ProductParams = {
    categoryId: string | null;
    subcategoryId: string | null;
    size: string | null;
    limit: number;
    page: number;
}

export interface OneProduct {
    id: string;
    restaurantProductId: string;
    name: string;
    image: string;
    weight: number;
    description: string;
    price: number;
    isFavorite: boolean;
    quantityInBasket: number | null;
    restaurantId: string;
}

export interface Products {
    id: string;
    restaurantProductId: string;
    name: string;
    image: string;
    weight: number;
    description: string;
    price: number;
    isFavorite: boolean;
    quantityInBasket: number | null;
    restaurantId: string;
}

export interface ProductListProps {
    products: Products[];
    toggleFavorite: (id: string) => void;
}