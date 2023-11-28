import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/authContext';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">EasyDrive</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    {currentUser ? (
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/show-all-cars">All Cars</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/show-cart">Cart</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/show-bookings">Orders</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/myprofile">My Profile</Link></li>
                            
                            {console.log(currentUser)}
                            {currentUser.userEmail === 'user123@gmail.com' && (
                                <>
                                    <li className="nav-item"><Link className="nav-link" to="/add-car">Add New Car</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
                                </>
                            )}

                            <li className="nav-item"><button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            {location.pathname === '/login' && <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>}
                            {location.pathname === '/signup' && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
                            {(location.pathname !== '/login' && location.pathname !== '/signup') && (
                                <>
                                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
                                </>
                            )}
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
