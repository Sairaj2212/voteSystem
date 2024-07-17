// src/AdminComponents/Authentication/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    const location = useLocation();

    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/" state={{ from: location }} />
    );
};

export default ProtectedRoute;
