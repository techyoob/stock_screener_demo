import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../services/useAuth";

const AuthRequired = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (

        allowedRoles?.includes(auth?.account?.role)
            ? <Outlet />
            : auth?.account
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default AuthRequired;