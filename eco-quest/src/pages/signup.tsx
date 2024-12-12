// src/pages/signup.tsx
import React, { useState } from "react";
import { Input, Button, Card, Spacer } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import './login.css'

export function Signup() {
  // States to hold user input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // User object
    const user = {
      username,
      email,
      password
    };

    try {
      //Send data to backend
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(user)
      });

      if (response.ok) {
        //alert("Signup successful");
        navigate('/login');
      }
      else {
        const errorData = await response.json();
        //alert(errorData.message || "Signup failed");
      }
  
  
    } catch (error) {
      console.error("Error:", error);
      //alert("Error signing up");
    };

  };

  


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-10 w-full max-w-md shadow-md login-card">
        <h1 className="text-center text-3xl font-bold mb-6 login-title">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit = {handleSubmit}>
          <Input 
            type="text" 
            label="Username" 
            placeholder="Username" 
            required 
            value = {username}
            onChange = {(e) => setUsername(e.target.value)}
            className='login-input-field'
          />
          <Input 
            type="email" 
            label="Email" 
            placeholder="Email" 
            required 
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            className='login-input-field'
          />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            required
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            className='login-input-field'
          />
          <Spacer y={1} />
          <Button type="submit" color="primary" className='login-submit-button'>
            Sign Up
          </Button>
        </form>
        <Spacer y={1} />
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;
