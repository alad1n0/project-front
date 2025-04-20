export interface CategoryProduct {
    id: string;
    name: string;
    subcategories: SubcategoryProduct[];
}

export interface SubcategoryProduct {
    id: string;
    name: string;
}

export type ProductParams = {
    categoryId: string | null;
    subcategoryId: string | null;
}

export interface OneProduct {
    id: number;
    name: string;
    image: string;
    weight: number;
    description: string;
    price: number;
}