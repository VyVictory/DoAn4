import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <AuthContext.Provider value={{ showLogin, setShowLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
