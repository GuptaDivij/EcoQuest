import React, { useState, useEffect } from "react";

export function Profile() {

    // Fetch data from backend to populate profile page
    const [username, setUsername] = useState<string | null>(null);
    const [footprint, setFootprint] = useState<string | null>(null);



    const populatePage = async () => {

        // Connect to backend
        try {
            const response = await fetch("http://localhost:5000/profile", {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                alert('Error fetching user info');
            } else {
                const data = await response.json();
                setUsername(data.user);
                setFootprint(data.footprint);
            }

            



        } catch (error) {
            console.error("Error:", error);
            alert("Error populating profile page");
        };

    
    }

    useEffect(() => {
        populatePage();
    }, []); 

    

    return (
        <div>
            {username === null ? null : <h1>Hello, {username}</h1>}
            {footprint === null? <h1>Your most recent carbon footprint: No data found</h1> : <h1>Your most recent carbon footprint: {footprint}</h1>}
        </div>
        
        
    )
}