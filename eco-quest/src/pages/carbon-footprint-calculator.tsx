import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Input, Button} from "@nextui-org/react";

export function CarbonFootprintCalculator() {
    const [hasCar, setHasCar] = useState(false);
    const [calculated, setCalculated] = useState(false);

    // change to correct values
    const [weights, setWeights] = useState(new Map([
        ['Water', 1],
        ['Gas', 1],
        ['Electricity', 1],
        ['Cars', 1],
        ['Gasoline', 1]
    ]));
    
    const [water, setWater] = useState(0);
    const [gas, setGas] = useState(0);
    const [electricity, setElectricity] = useState(0);
    const [cars, setCars] = useState(0);
    const [gasoline, setGasoline] = useState(0);

    const [footprint, setFootprint] = useState(0);

    const handleCar = () => {
        setHasCar(true);
    }

    const calculate = () => {
        let value = 0;
        value += (weights.get('Water') ?? 0) * water;
        value += (weights.get('Gas') ?? 0) * gas;
        value += (weights.get('Electricity') ?? 0) * electricity;
        value += (weights.get('Cars') ?? 0) * cars;
        value += (weights.get('Gasoline') ?? 0) * gasoline;
        setFootprint(value);
        setCalculated(true);
    }

    return (
        <>
            <Card>
                <CardBody>
                    <p>Provide the number of gallons of water consumed in your household from your latest water bill:</p>
                    <Input placeholder="x gallons" onChange={e => setWater(Number(e.target.value))}></Input>
                    <p>Provide the number of gallons of gas consumed in your household from your latest gas bill:</p>
                    <Input placeholder="x gallons" onChange={e => setGas(Number(e.target.value))}></Input>
                    <p>Provide the number of kilowatt-hours of electricity consumed in your household from your latest electricity bill:</p>
                    <Input placeholder="x kilowatt-hours" onChange={e => setElectricity(Number(e.target.value))}></Input>

                    <div className="flex">
                        <p>Do you have a car?</p>
                        <Button onClick={handleCar}>Yes</Button>
                        <Button>No</Button>
                    </div>
                    {hasCar ? (
                        <div>
                            <p>How many cars do you have?</p>
                            <Input placeholder="x cars" onChange={e => setCars(Number(e.target.value))}></Input>
                        </div>
                    ):
                        <div></div>
                    }
                    

                    <p>Car #1</p>
                    <div className="flex">
                        <p>What type of car is it?</p>
                        <Button>Gasoline</Button>
                        <Button>Hybrid</Button>
                        <Button>Electric</Button>
                    </div>
                    <p>How many gallons of gasoline did you fill in the tank of this car this week?</p>
                    <Input placeholder="x gallons" onChange={e => setGasoline(Number(e.target.value))}></Input>
                    <br></br>
                    <Button variant="shadow" color="success" onClick={calculate}>Submit</Button>
                </CardBody>
            </Card>
            {calculated ? (
                <Card>
                    <CardBody>
                        <p>Carbon Footprint: {footprint}</p>
                    </CardBody>
                </Card>
            ):
                <div></div>
            }
        </>
        // <h1>This is the carbon footprint calculator page</h1>
    )
}