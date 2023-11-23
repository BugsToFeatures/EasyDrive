import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './Contexts/authContext'
import Login from './Components/loginComponent'
import Signup from './Components/signupComponent';
import Navigation from './Components/navigation';
import Car from './Components/carComponent';
import Cars from './Components/carsList';

function App() {
    const { currentUser } = useAuth();

    return (
        <AuthProvider>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/show-all-cars" element={<Cars />} />
                    <Route path="/show-car/:carId" element={<Car />} />
                    {/* other routes  */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;