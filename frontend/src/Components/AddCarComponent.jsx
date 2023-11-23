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
        <form onSubmit={handleSubmit}>
            <input type="text" name="make" value={carData.make} onChange={handleChange} placeholder="Make" />
            <input type="text" name="model" value={carData.model} onChange={handleChange} placeholder="Model" />
            <input type="text" name="year" value={carData.year} onChange={handleChange} placeholder="Year" />
            <input type="text" name="type" value={carData.type} onChange={handleChange} placeholder="Type" />
            <input type="text" name="color" value={carData.color} onChange={handleChange} placeholder="Color" />
            <input type="text" name="mileage" value={carData.mileage} onChange={handleChange} placeholder="Mileage" />
            <input type="text" name="fuelType" value={carData.fuelType} onChange={handleChange} placeholder="Fuel Type" />
            <input type="text" name="transmission" value={carData.transmission} onChange={handleChange} placeholder="Transmission" />
            <input type="number" name="dailyPrice" value={carData.dailyPrice} onChange={handleChange} placeholder="Daily Price" />
            <label>
                Available:
                <input type="checkbox" name="available" checked={carData.available} onChange={handleChange} />
            </label>
            <input type="text" name="imageUrl" value={carData.imageUrl} onChange={handleChange} placeholder="Image URL" />
            <button type="submit">Add Car</button>
        </form>
    );
};

export default CarAddForm;
