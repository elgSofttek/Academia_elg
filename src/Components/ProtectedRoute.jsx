import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuth();
    
    console.log('Protected Route Check:', user);

    if (!user) return <Navigate to="/login" />;

    if (requiredRole && (!user.permissions || !user.permissions.includes(requiredRole))) {
        console.log(`Acceso denegado. Se requiere el rol: ${requiredRole}`);
        return <Navigate to="/unauthorized" />;
    }

    return children;
};
