import React, { use } from 'react';
import { AuthContext } from '../contexts/Authcontext/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../pages/Shared/loading/Loading';

const PrivateRoute = ({children}) => {
    const { user, loading } = use (AuthContext)
    const location =useLocation();
    // console.log(location.pathname)

    if (loading) {
        return <Loading></Loading>
    }


    if (!user) {
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }
    return children;
    
}

export default PrivateRoute;