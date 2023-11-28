import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider} from './Contexts/authContext'
import Login from './Components/loginComponent'
import Signup from './Components/signupComponent';
import Navigation from './Components/navigation';
import CarDetails from './Components/carComponent';
import Cars from './Components/carsList';
import Cart from './Components/CartComponent'
import CarAddForm from './Components/AddCarComponent';
import BookingsList from './Components/bookingsListComponent';
import Admin from './Components/AdminComponent'
import Home from './Components/HomeComponent'
import UserProfile from './Components/ProfileComponent';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/show-all-cars" element={<Cars />} />
                    <Route path="/show-car/:carId" element={<CarDetails />} />
                    <Route path='/show-cart' element={< Cart />} />
                    <Route path="/add-to-cart/:carId" />
                    <Route path="/add-car" element={<CarAddForm />} />
                    <Route path="/show-bookings" element={<BookingsList />} />
                    <Route path="/bookACar/:carId" />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/myprofile' element={<UserProfile />} />
                    {/* other routes  */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;