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

    const [waterIsClicked, setWaterIsClicked] = useState(false);
    const [gasolineIsClicked, setGasolineIsClicked] = useState(false);
    const [electricityIsClicked, setElectricityIsClicked] = useState(false);
    const [vehicleIsClicked, setVehicleIsClicked] = useState(false);
    const [foodIsClicked, setFoodIsClicked] = useState(false);
    const [landfillIsClicked, setLandfillIsClicked] = useState(false);
    const [clothingIsClicked, setClothingIsClicked] = useState(false);

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
                setVehicleUsageUser(data.allFootprintData[0].gasolineCarUsage);
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

    const handleWaterFlip = () => {
        setWaterIsClicked(!waterIsClicked);
    }
    const handleGasolineFlip = () => {
        setGasolineIsClicked(!gasolineIsClicked);
    }
    const handleElectricityFlip = () => {
        setElectricityIsClicked(!electricityIsClicked);
    }
    const handleVehicleFlip = () => {
        setVehicleIsClicked(!vehicleIsClicked);
    }
    const handleFoodFlip = () => {
        setFoodIsClicked(!foodIsClicked);
    }
    const handleLandfillFlip = () => {
        setLandfillIsClicked(!landfillIsClicked);
    }
    const handleClothingFlip = () => {
        setClothingIsClicked(!clothingIsClicked);
    }
    
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
                    <div className="recommendations-section">
                        <Card className="recommendation-card" isPressable onClick={handleWaterFlip}>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <WaterIcon/>
                                    {waterIsClicked === false ? <h1 className="recommendation-text" >Your water consumption was {waterUsageUser < waterAvg ? <span>under</span> : waterUsageUser > waterAvg ? <span>over</span> : <span>equivalent to</span>} the average household usage of 448 gallons per week</h1>
                                    : waterUsageUser >= waterAvg ? <ul><li>Consider taking shorter showers or limiting yourself to one shower a day!</li><li>Try turning off the sink faucet when it isn't in use when brushing yor teeth or washing your face.</li></ul> : <h1>Keep up the great work! Try recycling your dishwashing water, etc. to reduce your footprint even more!</h1>}
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable onClick={handleGasolineFlip}>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <GasolineIcon/>
                                    {gasolineIsClicked === false ? <h1 className="recommendation-text" >Your gasoline consumption was {gasolineUsageUser < gasolineAvg ? <span>under</span> : gasolineUsageUser > gasolineAvg ? <span>over</span> : <span>equivalent to</span>} the average household usage of 24.823 gallons per week</h1>
                                    : gasolineUsageUser >= gasolineAvg ? <ul><li>If you have a thermostat at home, try keeping it at a lower temperature and throwing on a jacket during the cold weather</li><li>Make sure that you are not running appliances around your home that are gasoline-powered, such as the dishwasher or laundry machines, too frequently and only run them when you have enough to fill it up.</li></ul> : <h1>Keep up the great work! If you have one, ensure that the filters in your gas-powered furnace are kept clean to prevent heat generated from the furnace from being lost.</h1>}
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable onClick={handleElectricityFlip}>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <ElectricityIcon/>
                                    {electricityIsClicked === false ? <h1 className="recommendation-text" >Your electricity consumption was {electricityUsageUser < electricityAvg ? <span>under</span> : electricityUsageUser > electricityAvg ? <span>over</span> : <span>equivalent to</span>} the average household usage of 203.459 kilowatt hours per week</h1>
                                    : electricityUsageUser >= electricityAvg ? <ul><li>Make sure you are turning off the lights in a room when you are leaving the room and powering off your electronic devices once you are no longer using them.</li><li>Unplug appliances such as the toaster or the microwave when you are not using them as well as your devices once they are fully charged. </li></ul> : <h1>Keep up the great work! If you can, consider switching out all the lightbulbs in your home to ones that are much more energy conscious and made from more eco-friendly materials, such as LED lightbulbs.</h1>}
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable onClick={handleVehicleFlip}>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <CarIcon/>
                                    {vehicleIsClicked === false ? <h1 className="recommendation-text" >Your gas-powered vehicle usage was {vehicleUsageUser < vehicleAvg ? <span>under</span> : vehicleUsageUser > vehicleAvg ? <span>over</span> : <span>equivalent to</span>} the average household usage of 213.462 miles per week</h1>
                                    : vehicleUsageUser >= vehicleAvg ? <ul><li>If you commute to work or school every day, consider using public transportation to do so or carpooling with others.</li><li>If possible, try out alternate methods to driving, such as walking or biking, to travel shorter distances.</li></ul> : <h1>Keep up the great work! If you are considering buying or leasing a new car, consider a hybrid or electric car to help decrease your carbon emissions! Even if you are currently using a hybrid or electric car, it is always a great idea to try out public transportation or give others a ride if you are going to the same location.</h1>}
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable onClick={handleFoodFlip}>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <FoodIcon/>
                                    {foodIsClicked === false ? <h1 className="recommendation-text" >Your consumption of foods with high carbon levels (Meat, Coffee, Sugar, Seafood, Dairy) was {foodConsumptionUser < foodAvg ? <span>under</span> : foodConsumptionUser > foodAvg ? <span>over</span> : <span>equivalent to</span>} the average household consumption of 8.727 kilograms per week</h1>
                                    : foodConsumptionUser >= foodAvg ? <ul><li>If you drink coffee everyday, consider limiting yourself to 1 or 2 cups per day or buying your coffee beans from a carbon-neutral producer. </li><li>Whenever possible, try to substitute red meat, seafood, and dairy products in your recipes for more carbon neutral ingredients from brands that working towards this goal.</li></ul> : <h1>Keep up the great work! Make sure you are not buying more groceries than you will consume or will expire before you can get to them to avoid excessive food waste!</h1>}
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable onClick={handleLandfillFlip}>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <LandfillIcon/>
                                    {landfillIsClicked === false ? <h1 className="recommendation-text" >Your landfill generation was {landfillGenerationUser < landfillAvg ? <span>under</span> : landfillGenerationUser > landfillAvg ? <span>over</span> : <span>equivalent to</span>} the average landfill generation of 126.346 pounds per week</h1>
                                    : landfillGenerationUser >= landfillAvg ? <ul><li>Try not to purchase items that contain single-use plastics that cannot be recycled and instead, considering taking cloth bags to the grocery store and opting to use resusable waterbottles, utensils, straws, and other such household items.</li><li>When shopping for material options, try to buy durable items that you don't have to frequently repuchase and that contain eco-friendly packaging materials.</li></ul> : <h1>Keep up the great work! Consider supporting businesses that are conscious of their carbon footprint and try not to return too many items that are purchased online to prevent the items from being automatically thrown into landfill.</h1>}
                                </div>
                            </div>
                        </Card>
                        <Card className="recommendation-card" isPressable onClick={handleClothingFlip}>
                            <div>
                                <div className="flex flex-row recommendation">
                                    <ShoppingIcon/>
                                    {clothingIsClicked === false ? <h1 className="recommendation-text" >Your clothing purchased was {clothingPurchasedUser < clothingAvg ? <span>under</span> : clothingPurchasedUser > clothingAvg ? <span>over</span> : <span>equivalent to</span>} the average household clothing purchase of 1.558 pounds per week</h1>
                                    : clothingPurchasedUser >= clothingAvg ? <ul><li>When shopping for clothing, consider purchasing clothing made from sustainable materials such as linen and fabrics made from recycled materials</li><li>Whenever possible, try to purchase secondhand clothing or clothing that has been created locally, rather than from fast fashion brands that import cheaply-made clothing from much further away, which expends lots of energy and fossil fuels that are harmful to the environment.</li></ul> : <h1>Keep up the great work! Try to donate your old or unused clothing to local shelters, thrift stores as much as possible, or pass them down to your younger siblings and family members.</h1>}
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