// src/pages/login.tsx
import React, { useState } from "react";
import { Input, Button, Card, Spacer } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  // States to hold user input
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // User object
    const user = {
      email,
      password
    };

    try {
      // Send data to backend
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(user)
      });

      if (response.ok) {
        alert("Login successful");
        navigate('/profile');
      }
      else {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
      }


    } catch (error) {
      console.error("Error:", error);
      alert("Error logging in");
    };
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-10 w-full max-w-md shadow-md">
        <h1 className="text-center text-3xl font-bold mb-6">Login</h1>
        <form className="flex flex-col gap-4" onSubmit = {handleSubmit}>
          <Input 
            type="email" 
            label="Email" 
            placeholder="Email" 
            required
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            required
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
          />
          <Spacer y={1} />
          <Button type="submit" color="primary">
            Login
          </Button>
        </form>
        <Spacer y={1} />
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;
