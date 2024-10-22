import React from 'react';
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/navbar.tsx'

export function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
            <NavBar />
            <main>
                {children}
                <Outlet />
            </main>
        </>
    )
}