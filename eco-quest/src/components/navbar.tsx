import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom"

export function NavBar() {
    return (
        <>
            <Navbar>
                <NavbarBrand>
                    <p className="font-bold text-inherit">EcoQuest</p>
                </NavbarBrand>
                <NavbarContent className="sm:flex gap-4" justify="center">
                    <NavbarItem>
                    {/* <Link color="foreground" href="/">
                        Home
                    </Link> */}
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                    <Link to="/profile">
                        Profile
                    </Link>
                    </NavbarItem>
                    <NavbarItem>
                    <Link to="/leaderboard">
                        Leaderboard
                    </Link>
                    </NavbarItem>
                    <NavbarItem className=" lg:flex">
                    <Link to="/carbon-footprint-calculator"></Link>
                    </NavbarItem>
                    <NavbarItem>
                    <Button as={Link} color="primary" to="/carbon-footprint-calculator" variant="flat">
                        Track Your Carbon Impact!
                    </Button>
                    </NavbarItem>
                </NavbarContent>
    </Navbar>



            {/* <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/profile">
                <button>Profile</button>
            </Link>
            <Link to="/leaderboard">
                <button>Leaderboard</button>
            </Link>
            <Link to="/carbon-footprint-calculator">
                <button>Track your Carbon Impact!</button>
            </Link> */}
        </>
    )
}