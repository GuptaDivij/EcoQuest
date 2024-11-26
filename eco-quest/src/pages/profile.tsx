import React, { useState, useEffect } from "react";
import { Button, Card, dataFocusVisibleClasses } from "@nextui-org/react";
import { Link } from "react-router-dom";
import './profile.css';
import WaterIcon from '../icons/water-icon.tsx';
import GasolineIcon from '../icons/gasoline-icon.tsx';
import ElectricityIcon from '../icons/electricity-icon.tsx';
import CarIcon from '../icons/car-icon.tsx';
import FoodIcon from '../icons/food-icon.tsx';
import LandfillIcon from '../icons/landfill-icon.tsx';
import ShoppingIcon from '../icons/shopping-icon.tsx';
import { Chart } from "react-google-charts";

export function Profile() {

    // Fetch data from backend to populate profile page
    const [username, setUsername] = useState<string | null>(null);
    const [footprint, setFootprint] = useState<string | null>(null);

    const [waterUsageUser, setWaterUsageUser] = useState<number>(0);
    const [gasolineUsageUser, setGasolineUsageUser] = useState<number>(0);
    const [electricityUsageUser, setElectricityUsageUser] = useState<number>(0);
    const [vehicleUsageUser, setVehicleUsageUser] = useState<number>(0);
    const [foodConsumptionUser, setFoodConsumptionUser] = useState<number>(0);
    const [landfillGenerationUser, setLandfillGenerationUser] = useState<number>(0);
    const [clothingPurchasedUser, setClothingPurchasedUser] = useState<number>(0);

    const waterAvg = (448 / 8.69049) * 0.18;
    const gasolineAvg = (24.823 / 8.69049) * 8.887;
    const electricityAvg = (203.459 / 8.69049) * 0.417;
    const vehicleAvg = (213.462 / 22.9) * 8.89 / 0.993;
    const foodAvg = 8.727 * 57.863;
    const landfillAvg = 126.346 * (3.5 / 2.20462);
    const clothingAvg = 1.558 * (18.25 / 2.20462);

    const combinedArr: any[] = [["Carbon Footprint", "Timestamp"]];
    const chartOptions = {
        hAxis: {
          title: 'Carbon Footprint',
        },
        vAxis: {
          title: 'Timestamp',
          format: 'yyyy-MM-dd HH:mm:ss',
        },
        legend: { position: 'none' },
        pointSize: 5,
      };

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
                console.log("DATA: ", data);
                setUsername(data.user);
                setFootprint(data.footprint);
                setWaterUsageUser(data.allFootprintData[0].waterUsage);
                setGasolineUsageUser(data.allFootprintData[0].gasUsage);
                setElectricityUsageUser(data.allFootprintData[0].electricityUsage);
                setVehicleUsageUser(data.allFootprintData[0].gasolineCarUsage + data.allFootprintData[0].hybridCarUsage + data.allFootprintData[0].electricCarUsage);
                setFoodConsumptionUser(data.allFootprintData[0].meanConsumption + data.allFootprintData[0].coffeeConsumption + data.allFootprintData[0].sugarConsumption + data.allFootprintData[0].seafoodConsumption + data.allFootprintData[0].dairyConsumption);
                setLandfillGenerationUser(data.allFootprintData[0].wasteProduction);
                setClothingPurchasedUser(data.allFootprintData[0].clothingPurchased);

                for (let i = 0; i < data.allFootprintData.length; i++) {
                    combinedArr.push([data.allFootprintData[i].footprint, new Date(data.allFootprintData[i].timestamp)]);
                }
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Error populating profile page");
        };

        for (let i = 0; i < combinedArr.length; i++) {
            console.log(combinedArr[i]);
        }
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
                        <Card className="recommendation-card" isPressable>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <WaterIcon/>
                                    <h1 className="recommendation-text">Your water consumption was {waterUsageUser < waterAvg ? <span>under</span> : waterUsageUser > waterAvg ? <span>over</span> : <span>equivalent to</span>} the average household usage of 448 gallons per week</h1>
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <GasolineIcon/>
                                    <h1 className="recommendation-text">Your gasoline consumption was {gasolineUsageUser < gasolineAvg ? <span>under</span> : gasolineUsageUser > gasolineAvg ? <span>over</span> : <span>equivalent to</span>} the average household usage of 24.823 gallons per week</h1>
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <ElectricityIcon/>
                                    <h1 className="recommendation-text">Your electricity consumption was {electricityUsageUser < electricityAvg ? <span>under</span> : electricityUsageUser > electricityAvg ? <span>over</span> : <span>equivalent to</span>} the average household usage of 203.459 kilowatt hours per week</h1>
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <CarIcon/>
                                    <h1 className="recommendation-text">Your vehicle usage was {vehicleUsageUser < vehicleAvg ? <span>under</span> : vehicleUsageUser > vehicleAvg ? <span>over</span> : <span>equivalent to</span>} the average household usage of 213.462 miles per week</h1>
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <FoodIcon/>
                                    <h1 className="recommendation-text">Your consumption of foods with high carbon levels (Meat, Coffee, Sugar, Seafood, Dairy) was  {foodConsumptionUser < foodAvg ? <span>under</span> : foodConsumptionUser > foodAvg ? <span>over</span> : <span>equivalent to</span>} the average household consumption of 8.727 kilograms per week</h1>
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <LandfillIcon/>
                                    <h1 className="recommendation-text">Your landfill trash generation was {landfillGenerationUser < landfillAvg ? <span>under</span> : landfillGenerationUser > landfillAvg ? <span>over</span> : <span>equivalent to</span>} the average household generation of 126.346 pounds per week</h1>
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <ShoppingIcon/>
                                    <h1 className="recommendation-text">Your clothing purchasing was {clothingPurchasedUser < clothingAvg ? <span>under</span> : clothingPurchasedUser > clothingAvg ? <span>over</span> : <span>equivalent to</span>} the average household purchase of 1.558 pounds per week</h1>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <h1 className="progress-label">Your journey so far...</h1>
                    <Chart chartType="LineChart" width="100%" height="400px" data={combinedArr} options={chartOptions} />
                </div>
            }
        </div> 
    )
}