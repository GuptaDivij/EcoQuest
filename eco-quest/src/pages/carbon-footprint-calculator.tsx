import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Input, Button} from "@nextui-org/react";

export function CarbonFootprintCalculator() {
    const [hasCar, setHasCar] = useState(false);

    const handleCar = () => {
        setHasCar(true);
    }

    return (
        <>
            <Card>
                <CardBody>
                    <p>Provide the number of gallons of water consumed in your household from your latest water bill:</p>
                    <Input placeholder="x gallons"></Input>
                    <p>Provide the number of gallons of gas consumed in your household from your latest gas bill:</p>
                    <Input placeholder="x gallons"></Input>
                    <p>Provide the number of kilowatt-hours of electricity consumed in your household from your latest electricity bill:</p>
                    <Input placeholder="x kilowatt-hours"></Input>

                    <div className="flex">
                        <p>Do you have a car?</p>
                        <Button onClick={handleCar}>Yes</Button>
                        <Button>No</Button>
                    </div>
                    {hasCar ? (
                        <div>
                            <p>How many cars do you have?</p>
                            <Input placeholder="x cars"></Input>
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
                    <p>How many gallons of gasoline di you fill in the tank of this car this week?</p>
                    <Input placeholder="x cars"></Input>
                </CardBody>
            </Card>
        </>
        // <h1>This is the carbon footprint calculator page</h1>
    )
}