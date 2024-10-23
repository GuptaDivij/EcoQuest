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

export function NavBar() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">EcoQuest</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/">
            <button>Home</button>
          </Link>
        </NavbarItem>
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
          >
            Track Your Carbon Impact!
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Link to="/login">
            <Button variant="flat" color="secondary">
              Login
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/signup">
            <Button variant="flat" color="success">
              Sign Up
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
