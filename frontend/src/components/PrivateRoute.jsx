import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
    }, [user, loading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login?redirected=true" replace />;
    }

    return children;
};

export default PrivateRoute;
