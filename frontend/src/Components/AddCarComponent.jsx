import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarAddForm = () => {
    const navigate = useNavigate();
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        type: '',
        color: '',
        mileage: '',
        fuelType: '',
        transmission: '',
        dailyPrice: '',
        available: true,
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCarData({
            ...carData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/add-car/', carData)
            .then(response => {
                console.log(response);
                navigate('/show-all-cars');
            })
            .catch(error => {
                console.error('Error adding car:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
          <div className="form-group">
            <input type="text" name="make" value={carData.make} onChange={handleChange} placeholder="Make" className="form-control mb-3" />
            <input type="text" name="model" value={carData.model} onChange={handleChange} placeholder="Model" className="form-control mb-3" />
            <input type="text" name="year" value={carData.year} onChange={handleChange} placeholder="Year" className="form-control mb-3" />
            <input type="text" name="type" value={carData.type} onChange={handleChange} placeholder="Type" className="form-control mb-3" />
            <input type="text" name="color" value={carData.color} onChange={handleChange} placeholder="Color" className="form-control mb-3" />
            <input type="text" name="mileage" value={carData.mileage} onChange={handleChange} placeholder="Mileage" className="form-control mb-3" />
            <input type="text" name="fuelType" value={carData.fuelType} onChange={handleChange} placeholder="Fuel Type" className="form-control mb-3" />
            <input type="text" name="transmission" value={carData.transmission} onChange={handleChange} placeholder="Transmission" className="form-control mb-3" />
            <input type="number" name="dailyPrice" value={carData.dailyPrice} onChange={handleChange} placeholder="Daily Price" className="form-control mb-3" />
            <div className="form-check mb-3">
              <input type="checkbox" name="available" checked={carData.available} onChange={handleChange} className="form-check-input" id="availableCheck" />
              <label className="form-check-label" htmlFor="availableCheck">
                Available
              </label>
            </div>
            <input type="text" name="imageUrl" value={carData.imageUrl} onChange={handleChange} placeholder="Image URL" className="form-control mb-3" />
            <button type="submit" className="btn btn-primary">Add Car</button>
          </div>
        </form>
      );      
};

export default CarAddForm;
