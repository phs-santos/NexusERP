import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { ReactNode, useEffect } from "react";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            localStorage.setItem('lastPath', location.pathname);
        }
    }, [isAuthenticated, location]);

    if (!isAuthenticated) return <Navigate to="/login" />;
    return <>{children}</>;
}