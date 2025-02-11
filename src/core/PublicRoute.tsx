import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        if (localStorage.getItem('lastPath')) {
            return <Navigate to={localStorage.getItem('lastPath') || '/'} replace />;
        }
        return <Navigate to="/" replace />;
    }

    return !isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}