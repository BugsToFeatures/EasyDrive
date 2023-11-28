
//This component fetches the list of cars from our API and displays them:
//Khalid Dawd
//301144241
//2023/11/22

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/show-all-cars')
      .then(response => {
        setCars(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const seeCar = (id) => {
    navigate(`/show-car/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
        <h2 className="mb-4 text-center">Available Cars for Rent</h2>
        <div className="row">
            {cars.map(car => (
                <div key={car._id} className="col-md-4 mb-4">
                    <div className="card h-100">
                        <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h3 className="card-title">{car.make} {car.model}</h3>
                            <p className="card-text">Year: {car.year}</p>
                            <p className="card-text">Type: {car.type}</p>
                            <p className="card-text">Color: {car.color}</p>
                            <p className="card-text">Daily Price: ${car.dailyPrice}</p>
                            <p className="card-text">{car.available ? 'Available' : 'Not Available'}</p>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-primary w-100" onClick={() => seeCar(car._id)}>See This Car</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default CarsList;

