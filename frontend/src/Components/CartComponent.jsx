import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const Cart = () => {
  // const { carId } = useParams();
  const [cars, setCars] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    axios.get('http://localhost:3000/api/show-cart')
      .then(response => {
        console.log(response.data)
        setCartItems(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const bookCar = (id) => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    console.log(id)
    axios.post(`http://localhost:3000/api/bookACar/${id}`).then(data => {
      console.log('Booking A Car:', data);
    }).catch(err => {
      console.log(err)
    })
  };

  const handleDelete = (carId) => {
    if(window.confirm('Are you sure you want to delete this car?')) {
      axios.delete(`http://localhost:3000/api/remove-from-cart/${carId}`)
        .then(() => {
          setCars(cars.filter(car => car._id !== carId));
          navigate('/show-all-cars')
        })
        .catch(error => console.error(error));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Cart</h2>
      
        <div className="row">
        {cartItems.map(car => (
          <div className="col-md-4 mb-4" key={car._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
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
                <button className="btn btn-primary w-100" onClick={() => bookCar(car._id)} type="button">Buy</button>
                <button type="button" className="btn btn btn-outline-danger w-80" onClick={() => handleDelete(car._id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
        </div>
      
    </div>
  );
};

export default Cart;
