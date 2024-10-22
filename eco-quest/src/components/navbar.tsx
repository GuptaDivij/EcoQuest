import React from "react";
import { Link } from "react-router-dom"

export function NavBar() {
    return (
        <>
            <Link to="/">
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
            </Link>
        </>
    )
}