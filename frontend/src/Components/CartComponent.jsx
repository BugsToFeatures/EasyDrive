import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the cart items for the logged-in user
    axios.get('http://localhost:3000/api/show-cart') // Replace with your actual API endpoint
      .then(response => {
        setCartItems(response.data);
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
      <h2>Your Cart</h2>
      
        <div>
        {cartItems.map(car => (
          <div key={car._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <img src={car.imageUrl} alt={`${car.make} ${car.model}`} style={{ width: '200px', height: '120px' }} />
            <h3>{car.make} {car.model}</h3>
            <p>Year: {car.year}</p>
            <p>Type: {car.type}</p>
            <p>Color: {car.color}</p> 
            <p>Daily Price: ${car.dailyPrice}</p>
            <p>{car.available ? 'Available' : 'Not Available'}</p>
            <button type="button">Buy</button>
          </div>
        ))}
        </div>
      
    </div>
  );
};

export default Cart;
