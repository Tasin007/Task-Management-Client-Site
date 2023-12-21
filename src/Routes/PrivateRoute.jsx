import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";


const PrivateRoute = ({children}) => {
    const location = useLocation();
    console.log(location);
    const {user, loading} = useContext(AuthContext);
    if(loading){
        return (
            
                <div className="flex justify-center items-center mt-10">
                loading
                </div>
           
        )
    }

    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to="/login" />;
};

export default PrivateRoute;