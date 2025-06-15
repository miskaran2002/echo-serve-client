import React, { use } from 'react';
import { AuthContext } from '../contexts/Authcontext/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user} = use (AuthContext)
    if (!user) {
        <Navigate to='/login'></Navigate>
    }
    return children;
    
}

export default PrivateRoute;