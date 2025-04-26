import { useQuery } from "@tanstack/react-query";
import {ProductService} from "@/services/product/product.service";

export const useGetOneProduct = (id: string) => {
    return useQuery({
        queryKey: ['get-product', id],
        queryFn: () => ProductService.getOneProduct(id)
    });
};