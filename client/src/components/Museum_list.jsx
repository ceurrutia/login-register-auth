import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MuseumList = () => {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                  <button className="btn btn-primary xl ">Edit</button>
                  <button className="btn btn-danger xl">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MuseumList;
