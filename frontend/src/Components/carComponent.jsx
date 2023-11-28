// /*
// Student name: Iuliia Chugunova
// Student ID: 301150836
// File: carComponent.jsx
// Date: November 22, 2023
// Description: if a user logged in, it display a car info and provides a button 'Add to Cart'
// */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const CarDetails = () => {
  const { carId } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/show-car/${carId}`)
      .then(response => {
        setCarDetails(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const addToCart = (id) => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    axios.post(`http://localhost:3000/api/add-to-cart/${carId}`).then(data => {
      console.log('Adding to cart:', data);
    }).catch(err => {
      console.log(err)
    })
    console.log('Adding to cart:', carDetails);
  };

  if (!carDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
        <div className="card">
            <img src={carDetails.imageUrl} alt={`${carDetails.make} ${carDetails.model}`} className="card-img-top" style={{ height: '600px', objectFit: 'cover' }} />
            <div className="card-body">
                <h1 className="card-title">{carDetails.make} {carDetails.model}</h1>
                <h3 className="card-subtitle mb-2 text-muted">Year: {carDetails.year}</h3>
                <p className="card-text">Type: {carDetails.type}</p>
                <p className="card-text">Color: {carDetails.color}</p>
                <p className="card-text">Mileage: {carDetails.mileage} km</p>
                <p className="card-text">Fuel Type: {carDetails.fuelType}</p>
                <p className="card-text">Transmission: {carDetails.transmission}</p>
                <p className="card-text">Daily Price: ${carDetails.dailyPrice}</p>
                <p className="card-text">{carDetails.available ? 'Available' : 'Not Available'}</p>
            </div>
            <div className="card-footer">
                <button className="btn btn-primary" onClick={() => addToCart(carDetails._id)}>Add to Cart</button>
            </div>
        </div>
    </div>
);
};

export default CarDetails;
