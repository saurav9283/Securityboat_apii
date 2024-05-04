import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../services/authServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginService({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      navigate("/");
      
    } catch (error) {
      alert(error.response.data || "Something went wrong");
    }

  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-center py-4 bg-blue-500 text-white">
          <h2 className="text-3xl font-extrabold">Sign in to your account</h2>
        </div>
        <form className="px-8 pt-6 pb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              id="email-address"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              Sign in
            </Button>
          </div>
          <p>Don't have an account <Link to="/register" className="text-blue-500">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
