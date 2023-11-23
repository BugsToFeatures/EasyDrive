/*
Student name: Iuliia Chugunova
Student ID: 301150836
File: carComponent.jsx
Date: November 22, 2023
Description: if a user logged in, it display a car info and provides a button 'Add to Cart'
*/

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/authContext';

const CarDetails = () => {
  const { carId } = useParams(); // Extract carId from URL parameters
  const [carDetails, setCarDetails] = useState(null);
  const history = useHistory();
  const auth = useAuth();

  useEffect(() => {
    // function to fetch car details from the backend
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`/api/cars/${carId}`);
        const data = await response.json();
        setCarDetails(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const addToCart = () => {
    // Check if the user is authenticated before allowing them to add to the cart
    if (!auth.currentUser) {
        // Redirect to the login page if the user is not authenticated
        history.push('/login');
        return;
    }
    console.log('Adding to cart:', carDetails);
    //here must be redirection to add cart and put this item to a cart in user model
  };


  // Render loading state while fetching car details
  if (!carDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h1>{carDetails.model}</h1>
        <img src={car.imageUrl} alt={`${car.make} ${car.model}`} style={{ width: '200px', height: '120px' }} />
        <h3>{car.make} {car.model}</h3>
        <p>Year: {car.year}</p>
        <p>Type: {car.type}</p>
        <p>Color: {car.color}</p>
        <p>Mileage: {car.mileage} km</p>
        <p>Fuel Type: {car.fuelType}</p>
        <p>Transmission: {car.transmission}</p>
        <p>Daily Price: ${car.dailyPrice}</p>
        <p>{car.available ? 'Available' : 'Not Available'}</p>

      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default CarDetails;