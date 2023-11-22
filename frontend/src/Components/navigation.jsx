import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../Components/authContext';
import '../App.css';

const Navigation = () => {
    const {currentUser, logout } = useAuth();

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {currentUser ? (
                    <>
                        <li><Link to="/cars">All Cars</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/orders">Orders</Link></li>
                        <li OnClick={logout}><Link to="/">Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;