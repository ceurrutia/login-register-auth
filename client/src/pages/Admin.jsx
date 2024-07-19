import React from "react";
import Museum_list from "../components/Museum_list";
import Navigation from '../components/Navigation'

function Admin() {
  return (
    <div>
      <Navigation />
      <h1>Administrative Section </h1>
      <Museum_list />
    </div>
  );
}

export default Admin;
