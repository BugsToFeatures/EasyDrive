import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/show-bookings')
      .then(response => {
        setBookings(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const viewBooking = (id) => {
    navigate(`/show-car/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="mb-4">Your Bookings</h2>
      <div>
        {bookings.map(booking => (
          <div key={booking._id} className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{booking.car}</h3>
              <p className="card-text">Total Cost: ${booking.totalCost}</p>
              <p className="card-text">Status: {booking.status}</p>
              <p className="card-text">Booked On: {new Date(booking.createdAt).toLocaleDateString()}</p>
              <button type="button" className="btn btn-primary" onClick={() => viewBooking(booking.car_Id)}>View This Booking</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
};

export default BookingsList;
