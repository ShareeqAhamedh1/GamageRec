import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [adminToken, setAdminToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [editData, setEditData] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const storedUserData = JSON.parse(localStorage.getItem('user_data'));
    const storedAdminData = JSON.parse(localStorage.getItem('admin_data'));

    useEffect(() => {
        if (storedUserData) {
            setUserToken(storedUserData.userToken);
            setUserData(storedUserData.user);
            setIsAuthenticated(true);
        }

        if (storedAdminData) {
            setAdminToken(storedAdminData.adminToken);
            setAdminData(storedAdminData.admin);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (newToken, newData) => {
        localStorage.setItem(
            'user_data',
            JSON.stringify({ userToken: newToken, user: newData }),
        );

        setUserToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
    };

    const adminLogin = (newToken, newData) => {
        localStorage.setItem(
            'users',
            JSON.stringify({ adminToken: newToken, admin: newData }),
        );
        setAdminToken(newToken);
        setAdminData(newData.email); 
        setIsAuthenticated(true);
    };
    

    const view = (newToken, newData, usersData) => {
        localStorage.setItem(
            'users_data',
            JSON.stringify({ adminToken: newToken, admin: newData }),
        );
    
        setAdminToken(newToken);
        setAdminData(newData);
        setIsAuthenticated(true);
        setDataSource(usersData); // Set the fetched users data into the state
    };
    

    const logout = () => {
        localStorage.removeItem('user_data');
        localStorage.removeItem('admin_data');
        setUserToken(null);
        setAdminToken(null);
        setUserData(null);
        setAdminData(null);
        setIsAuthenticated(false);
    };

    const edit = (newToken, newData) => {
        // Add your edit functionality here
        console.log('Edit button clicked ' );
        localStorage.setItem(
            'user_data',
            JSON.stringify({ userToken: newToken, user: newData }),
        );

        // Store the values being edited
        // setEditData(newData);
        setUserToken(newToken);
        // setUserData(newData);
        setIsAuthenticated(true);
    };
    

    return (
        <AuthContext.Provider value={{ userToken, adminToken, isAuthenticated, login, adminLogin, logout,view,edit,editData, userData, adminData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
