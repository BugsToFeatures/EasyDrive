import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editCarData, setEditCarData] = useState({});
  const [showToast, setShowToast] = useState(false);


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

  const handleEditClick = (car) => {
    setEditCarData(car);
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    setEditCarData({ ...editCarData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/edit-car/${editCarData._id}`, editCarData)
      .then(() => {
        console.log('hey')
        setCars(cars.map(car => car._id === editCarData._id ? { ...car, ...editCarData } : car));
        setShowModal(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        navigate('/show-all-cars')
      })
      .catch(error => {
        console.error('API call failed', error);
      });
  };

  const handleDelete = (carId) => {
    if(window.confirm('Are you sure you want to delete this car?')) {
      axios.delete(`http://localhost:3000/api/delete-car/${carId}`)
        .then(() => {
          setCars(cars.filter(car => car._id !== carId));
        })
        .catch(error => console.error(error));
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Admin: Car Management</h2>
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
                        <div className="card-footer justify-content-end">
                            <button type="button" className="btn btn-warning w-80" onClick={() => handleEditClick(car)}>Edit</button>
                            <button type="button" className="btn btn btn-outline-danger w-80" onClick={() => handleDelete(car._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>

    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Make</Form.Label>
              <Form.Control type="text" name="make" value={editCarData.make || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control type="text" name="model" value={editCarData.model || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control type="text" name="year" value={editCarData.year || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" name="type" value={editCarData.type || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control type="text" name="color" value={editCarData.color || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mileage</Form.Label>
              <Form.Control type="text" name="mileage" value={editCarData.mileage || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fuel Type</Form.Label>
              <Form.Control type="text" name="fuelType" value={editCarData.fuelType || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Transmission</Form.Label>
              <Form.Control type="text" name="transmission" value={editCarData.transmission || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Daily Price</Form.Label>
              <Form.Control type="number" name="dailyPrice" value={editCarData.dailyPrice || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox" 
                label="Available" 
                name="available" 
                checked={editCarData.available || false} 
                onChange={e => setEditCarData({ ...editCarData, available: e.target.checked })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="imageUrl" value={editCarData.imageUrl || ''} onChange={handleEditChange} />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Car Updated</strong>
        </Toast.Header>
        <Toast.Body>Car details have been successfully updated.</Toast.Body>
      </Toast>
    </div>
  );
};

export default Admin;
