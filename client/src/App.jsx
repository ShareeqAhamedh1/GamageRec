import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext';
import AdminLogin from './Auth/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Edit from './Auth/Edit';

const App = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/login"
                    element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />

                <Route
                    path="/adminLogin"
                    element={!isAuthenticated ? <AdminLogin /> : <Navigate to="/adminDashboard" />}
                />

                <Route
                    path="/adminDashboard"
                    element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/adminLogin" />}
                />
                <Route
                    path="/edit"
                    element={isAuthenticated ? <Edit /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
