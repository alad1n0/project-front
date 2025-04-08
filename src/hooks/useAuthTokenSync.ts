import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useAuthTokenSync = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.access_token) {
            localStorage.setItem("access_token", session.access_token);
        }
    }, [session?.access_token]);
};