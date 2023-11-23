import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/authContext';
import { useNavigate} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/login', { email, password });
            login({ ...response.data });
            navigate('/show-all-cars')
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;