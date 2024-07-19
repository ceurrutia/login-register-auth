import React from "react";
import Card from 'react-bootstrap/Card';
import { useAuth } from '../context/AuthContext';
import Navigation from "../components/Navigation";

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
<div>
  <Navigation />
    <h1> Profile Page </h1>
    <div className="container mt-5">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{user.username || "User"}</Card.Subtitle>
          <Card.Text>
            <strong>Email:</strong> {user.email}<br />
            <strong>Username:</strong> {user.username}<br />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    </div>
  );
}

export default ProfilePage;
