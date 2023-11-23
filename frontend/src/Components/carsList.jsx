
//This component fetches the list of cars from our API and displays them:
//Khalid Dawd
//301144241
//2023/11/22

import React, { useState, useEffect } from 'react';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://....') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Error');
        }
        return response.json();
      })
      .then(data => {
        setCars(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Available Cars for Rent</h2>
      <div>
        {cars.map(car => (
          <div key={car._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsList;
