import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../../services/authServices";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerService(formData);
      navigate("/login")
    } catch (error) {
      alert(error.response.data || "Something went wrong")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-center py-4 bg-blue-500 text-white">
          <h2 className="text-3xl font-extrabold">Register</h2>
        </div>
        <form className="px-8 pt-6 pb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              id="name"
              name="name"
              label="Name"
              autoComplete="name"
              required
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email address"
              autoComplete="email"
              required
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              required
              fullWidth
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              Register
            </Button>
          </div>
          <p>
            Already have an account{" "}
            <Link  to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
