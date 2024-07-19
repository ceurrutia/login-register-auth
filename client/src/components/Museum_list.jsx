import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const MuseumList = () => {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentMuseum, setCurrentMuseum] = useState(null);

  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/museums');
        setMuseums(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchMuseums();
  }, []);

  const handleEditClick = (museum) => {
    setCurrentMuseum(museum);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentMuseum(null);
  };

  const handleSaveChanges = async () => {
    if (currentMuseum) {
      try {
        await axios.put(`http://localhost:3000/api/museums/${currentMuseum._id}`, currentMuseum);
        setMuseums(museums.map(m => (m._id === currentMuseum._id ? currentMuseum : m)));
        handleCloseModal();
      } catch (error) {
        console.error('Error updating museum', error);
      }
    }
  };

  const handleChange = (e) => {
    setCurrentMuseum({
      ...currentMuseum,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container-table mt-5">
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Museum Name</th>
              <th scope="col">Address</th>
              <th scope="col">Description</th>
              <th scope="col">Day Free</th>
              <th scope="col">Hour Free</th>
              <th scope="col">City</th>
              <th scope="col">Country</th>
              <th scope="col">How to Go</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {museums.map((museum, index) => (
              <tr key={index}>
                <td><img src={museum.image} alt={museum.museumName} width="100" className="img-fluid" /></td>
                <td>{museum.museumName}</td>
                <td>{museum.address}</td>
                <td>{museum.description}</td>
                <td>{museum.day_free}</td>
                <td>{museum.hour_free}</td>
                <td>{museum.city}</td>
                <td>{museum.country}</td>
                <td><a href={museum.how_go} target="_blank" rel="noopener noreferrer">Directions</a></td>
                <td>
                  <Button variant="primary" onClick={() => handleEditClick(museum)}>Edit</Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Museum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentMuseum && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Museum Name</Form.Label>
                <Form.Control
                  type="text"
                  name="museumName"
                  value={currentMuseum.museumName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={currentMuseum.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={currentMuseum.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Day Free</Form.Label>
                <Form.Control
                  type="text"
                  name="day_free"
                  value={currentMuseum.day_free}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hour Free</Form.Label>
                <Form.Control
                  type="text"
                  name="hour_free"
                  value={currentMuseum.hour_free}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={currentMuseum.city}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={currentMuseum.country}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>How to Go</Form.Label>
                <Form.Control
                  type="text"
                  name="how_go"
                  value={currentMuseum.how_go}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MuseumList;
