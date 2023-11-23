import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/authContext';
import '../App.css';

const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                {currentUser ? (
                    <>
                        <li><Link to="/show-all-cars">All Cars</Link></li>
                        <li><Link to="/show-cart">Cart</Link></li>
                        <li><Link to="/orders">Orders</Link></li>
                        <li><Link to="/add-car">Add New Car</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        {location.pathname === '/login' && <li><Link to="/signup">Signup</Link></li>}
                        {location.pathname === '/signup' && <li><Link to="/login">Login</Link></li>}
                        {(location.pathname !== '/login' && location.pathname !== '/signup') && (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/signup">Signup</Link></li>
                            </>
                        )}
                    </>
                )}
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;
