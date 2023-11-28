import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/myprofile')
            .then(response => {
                setUserData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Profile Details</h5>
                    {userData && (
                        <div>
                            <p><strong>Username:</strong> {userData.username}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>First Name:</strong> {userData.firstName}</p>
                            <p><strong>Last Name:</strong> {userData.lastName}</p>
                            <p><strong>Phone:</strong> {userData.phone}</p>
                            <p><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;