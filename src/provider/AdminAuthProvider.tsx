import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);
    }, []);

    const login = (access: string, refresh: string) => {
        Cookies.set("admin_access_token", access, { expires: 7, secure: true, sameSite: "Strict", path: "/" });
        Cookies.set("admin_refresh_token", refresh, { expires: 30, secure: true, sameSite: "Strict", path: "/" });
        setIsAuthenticated(true);
    };

    const logout = async () => {
        Cookies.remove("admin_access_token");
        Cookies.remove("admin_refresh_token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthAdmin = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};