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
    <div>
        <h1>{carDetails.model}</h1>
        <img src={carDetails.imageUrl} alt={`${carDetails.make} ${carDetails.model}`} style={{ width: '200px', height: '120px' }} />
        <h3>{carDetails.make} {carDetails.model}</h3>
        <p>Year: {carDetails.year}</p>
        <p>Type: {carDetails.type}</p>
        <p>Color: {carDetails.color}</p>
        <p>Mileage: {carDetails.mileage} km</p>
        <p>Fuel Type: {carDetails.fuelType}</p>
        <p>Transmission: {carDetails.transmission}</p>
        <p>Daily Price: ${carDetails.dailyPrice}</p>
        <p>{carDetails.available ? 'Available' : 'Not Available'}</p>

        <button onClick={() => addToCart(carDetails._id)}>Add to Cart</button>
    </div>
  );
};

export default CarDetails;
