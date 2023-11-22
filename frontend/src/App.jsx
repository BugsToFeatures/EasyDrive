import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Contexts/authContext'
import Login from './Components/loginComponent'
import Signup from './Components/signupComponent';
import Navigation from './Components/navigation';

function App() {
    const { currentUser } = useAuth();

    return (
        <AuthProvider>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* other routes  */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;