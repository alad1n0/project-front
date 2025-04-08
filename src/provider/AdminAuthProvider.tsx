import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AdminAuthContextType {
    isAuthenticated: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get("access_token");
        setIsAuthenticated(!!token);
    }, []);

    const login = (access: string, refresh: string) => {
        Cookies.set("admin_access_token", access, { expires: 7 });
        Cookies.set("admin_refresh_token", refresh, { expires: 30 });
        setIsAuthenticated(true);
    };

    const logout = async () => {
        Cookies.remove("admin_access_token");
        Cookies.remove("admin_refresh_token");
        setIsAuthenticated(false);
    };

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAuthAdmin = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};