import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;