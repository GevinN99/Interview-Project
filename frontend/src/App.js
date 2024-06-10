import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const ProtectedRoute = ({ element, ...rest }) => {
    const isAuthenticated = localStorage.getItem('auth-token');
    return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/users" element={<ProtectedRoute element={<UserPage />} />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
