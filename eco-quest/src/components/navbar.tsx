// src/components/navbar.tsx
import React, {useState, useEffect} from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useLocation, Link } from "react-router-dom";
import Logo from '../icons/logo.tsx'
import './navbar.css'

export function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/session", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => setLoggedIn(data.loggedIn))
      .catch((err) => console.error("Error fetching session:", err));
  }, [location]);

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoggedIn(false);
        }
        else {
          console.error("Failed to log out:", data.message);
        }
      })
      .catch((err) => console.error("Log out error:", err));
  }

  return (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        {loggedIn && (
          <>
          <NavbarItem>
            <Link to="/profile">Profile</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/leaderboard">Leaderboard</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              to="/carbon-footprint-calculator"
              variant="flat"
              className="footprint-button"
            >
              Track Your Carbon Impact!
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Link to="/login">
              <Button variant="flat" className="login-button" onClick={handleLogout}>
                Log Out
              </Button>
            </Link>
          </NavbarItem>
          </>
          
        )}
        {!loggedIn && (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                to="/carbon-footprint-calculator"
                variant="flat"
                className="footprint-button"
              >
                Track Your Carbon Impact!
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Link to="/login">
                <Button variant="flat" className="login-button">
                  Log In / Sign Up
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
        
        
      </NavbarContent>
    </Navbar>
  );
}
