// src/pages/signup.tsx
import React from "react";
import { Input, Button, Card, Spacer } from "@nextui-org/react";
import { Link } from "react-router-dom";

export function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-10 w-full max-w-md shadow-md">
        <h1 className="text-center text-3xl font-bold mb-6">Sign Up</h1>
        <form className="flex flex-col gap-4">
          <Input type="text" label="Username" placeholder="Username" required />
          <Input type="email" label="Email" placeholder="Email" required />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            required
          />
          <Spacer y={1} />
          <Button type="submit" color="primary">
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
