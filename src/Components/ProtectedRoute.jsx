import { Children } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute=({children})=>{
    const{user}=useAuth();
    console.log('protected',user);
    

    if (!user) return <Navigate to={'/Login'}/>;
    return children 
}