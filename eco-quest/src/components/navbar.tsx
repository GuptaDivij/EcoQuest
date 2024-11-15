// src/components/navbar.tsx
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Logo from '../icons/logo.tsx'
import './navbar.css'

export function NavBar() {
  return (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/profile">Profile</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/leaderboard">Leaderboard</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
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
              Login / Signup
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
