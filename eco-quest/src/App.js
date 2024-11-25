// src/App.js
import * as React from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home.tsx";
import { CarbonFootprintCalculator } from "./pages/carbon-footprint-calculator.tsx";
import { Leaderboard } from "./pages/leaderboard.tsx";
import { Profile } from "./pages/profile.tsx";
import { Layout } from "./Layout.tsx";
import { Login } from "./pages/login.tsx";
import { Signup } from "./pages/signup.tsx";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/carbon-footprint-calculator"
              element={<CarbonFootprintCalculator />}
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </NextUIProvider>
  );
}

export default App;
