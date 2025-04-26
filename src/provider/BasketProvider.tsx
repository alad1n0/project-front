"use client"

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {BasketContextType} from "@/types/basket/interface";
import {useGetCountInBasket} from "@/hooks/useGetCountInBasket";

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({children} : { children: ReactNode }) => {
    const { data, refetch } = useGetCountInBasket();
    const [count, setCount] = useState<number | null>(null);
    const [lastRefresh, setLastRefresh] = useState<number>(Date.now());

    useEffect(() => {
        if (data?.data?.count !== undefined) {
            setCount(data.data.count);
        }
    }, [data]);

    const refresh = async () => {
        const { data } = await refetch();
        if (data?.data?.count !== undefined) {
            setCount(data.data.count);
            setLastRefresh(Date.now());
        }
    };

    return (
        <BasketContext.Provider value={{ count, refresh, lastRefresh }}>
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) throw new Error('useBasket must be used within BasketProvider');
    return context;
};