import React from 'react';
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/navbar.tsx'

export function Layout() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}