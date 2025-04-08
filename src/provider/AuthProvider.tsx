import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);
    }, []);

    const login = (access: string, refresh: string) => {
        localStorage.setItem("access_token", access);
        Cookies.set("refresh_token", refresh, { expires: 30, secure: true });
        setIsAuthenticated(true);
    };

    const logout = async () => {
        localStorage.removeItem("access_token");
        Cookies.remove("refresh_token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};