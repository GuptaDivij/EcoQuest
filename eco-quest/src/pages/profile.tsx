import React, { useState, useEffect } from "react";
import { Button, Card } from "@nextui-org/react";
import { Link } from "react-router-dom";
import './profile.css';
import WaterIcon from '../icons/water-icon.tsx';
import GasolineIcon from '../icons/gasoline-icon.tsx';
import ElectricityIcon from '../icons/electricity-icon.tsx';
import CarIcon from '../icons/car-icon.tsx';
import TransportationIcon from '../icons/transportation-icon.tsx';
import FoodIcon from '../icons/food-icon.tsx';
import LandfillIcon from '../icons/landfill-icon.tsx';
import ShoppingIcon from '../icons/shopping-icon.tsx';

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
                }
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
            {username === null ? null : <h1 className="newsreader-greeting-text">Hello {username},</h1>}
            {footprint === null ?
                <div> 
                    <h1 className="newsreader-additional-text">Have you logged your footprint this week?</h1>
                    <Button as={Link} to="/carbon-footprint-calculator" variant="flat" className="footprint-button-profile"> Track Your Carbon Impact!</Button>
                </div> : 
                <div>
                    <h1 className="newsreader-data-text">This week's carbon footprint: {footprint}</h1>
                    <h1 className="newsreader-data-text">This week's score: </h1>
                    <div className="recommendations-section">
                        `<Card>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <WaterIcon />
                                    <h1 className="recommendation-text">Your water consumption was <span className="footprint-performance">over/under/equivalent</span> to the eco-friendly standard of x gallons per week</h1>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <GasolineIcon/>
                                    <h1 className="recommendation-text">Your gasoline consumption was <span className="footprint-performance">over/under/equivalent</span> to the eco-friendly standard of x gallons per week</h1>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <ElectricityIcon/>
                                    <h1 className="recommendation-text">Your electricity consumption was <span className="footprint-performance">over/under/equivalent</span> to the eco-friendly standard of x kilowatt-hours per week</h1>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <CarIcon/>
                                    <h1 className="recommendation-text">Your vehicle usage was <span className="footprint-performance">over/under/equivalent</span> to the eco-friendly standard of x miles per week</h1>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <TransportationIcon/>
                                    <h1 className="recommendation-text">Your public transportation usage was <span className="footprint-performance">over/under/equivalent</span> to the eco-friendly standard of x miles per week</h1>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <FoodIcon/>
                                    <h1 className="recommendation-text">Your consumption of foods with high carbon levels was <span className="footprint-performance">over/under/equivalent</span> to the eco-friendly standard of x kilograms per week</h1>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <LandfillIcon/>
                                    <h1 className="recommendation-text">Your landfill trash generation was <span className="footprint-performance">over/under/equivalent</span> to the eco-friendly standard of x pounds per week</h1>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <ShoppingIcon/>
                                    <h1 className="recommendation-text">Your clothing purchasing was <span className="footprint-performance">over/under/equivalent</span> to the eco-friendly standard of x pounds per week</h1>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <h1 className="progress-label">Your journey so far...</h1>
                </div>
            }
        </div> 
    )
}