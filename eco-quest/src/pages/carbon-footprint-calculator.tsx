import React, {useState, useEffect} from "react";
import {Card, CardBody} from "@nextui-org/card";
import {Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import MinusIcon from '../icons/minus-icon.tsx'
import './carbon-footprint-calculator.css'

export function CarbonFootprintCalculator() {

    const [userInputs, setUserInputs] = useState({waterVal: "", gasVal: "", electricityVal: "", grainsVal: "", legumesVal: "", fruitVal: "", vegetablesVal: "", nonDairyMilkVal: "", dairyVal: "", eggsVal: "", seafoodVal: "", meatVal: "", nutsVal: "", sugarVal: "", coffeeVal: "", wasteVal: "", clothingVal: ""});
    const setNewUserInputs = ((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserInputs(prevUserInputs => ({...prevUserInputs, [e.target.name]: e.target.value}));
        console.log(userInputs);
    });

    const [carInfo, setCarInfo] = useState([{carType: "", milesDriven:""}]);
    const [pubTransInfo, setPubTransInfo] = useState([{pubTransType: "", milesTraveled: ""}])

    const handleAddCar = () => {
        setCarInfo([...carInfo, {carType: "", milesDriven: ""}]);
    }

    const handleRemoveCar = (i) => {
        let newCarInfo = [...carInfo];
        newCarInfo.splice(i, 1);
        setCarInfo(newCarInfo);
    }

    const handleCarInfoChange = (i, field, value) => {
        let newCarInfo = [...carInfo];
        newCarInfo[i][field] = value;
        setCarInfo(newCarInfo);
    }

    const handleAddPubTrans = () => {
        setPubTransInfo([...pubTransInfo, {pubTransType: "", milesTraveled: ""}]);
    }

    const handleRemovePubTrans = (i) => {
        let newPubTransInfo = [...pubTransInfo];
        newPubTransInfo.splice(i, 1);
        setPubTransInfo(newPubTransInfo);
    }

    const handlePubTransInfoChange = (i, field, value) => {
        let newPubTransInfo = [...pubTransInfo];
        pubTransInfo[i][field] = value;
        setPubTransInfo(newPubTransInfo);
    }
    
    const [footprintCalculated, setFootprintCalculated] = useState(0);

    const calculateEmissions = () => {
        let vals: {key: string, value: number}[] = [];
        let sum: number = 0;
        Object.entries(userInputs).forEach(([key, value]) => {
            vals.push({key: key, value: Number(value)});
        });

        for (let i = 0; i < vals.length; i++) {
            if(vals[i].key === "waterVal") {
                sum += (vals[i].value / 8.69049) * 0.18; // # gallons of water used in two months / # of weeks in two months (gallons of water used per week) * kg of co2 produced per gallon
            } else if (vals[i].key === "gasVal") {
                sum += (vals[i].value / 8.69049) * 8.887; // # gallons of gas used in two months / # of weeks in two months (gallons of water used per week) * kg of co2 produced per gallon 
            } else if (vals[i].key === "electrictyVal") {
                sum += (vals[i].value / 8.69049) * 0.417; // # kilowatt-hours of electricity used in two months / # of weeks in two months (kilowatt-hours of electricity used per week) * kg of co2 produced per kilowatt-hour 
            } else if (vals[i].key === "grainsVal") {
                sum += vals[i].value * (2.27 / 2.20462);
            } else if (vals[i].key === "legumesVal") {
                sum += vals[i].value * (1.9766666667 / 2.20462);
            } else if (vals[i].key === "fruitVal") {
                sum += vals[i].value * (1.05833333333 / 2.20462);
            } else if (vals[i].key === "vegetablesVal") {
                sum += vals[i].value * (0.625 / 2.20462);
            } else if (vals[i].key === "nonDairyMilkVal") {
                sum += vals[i].value * (0.6233333333 / 2.20462);
            } else if (vals[i].key === "dairyVal") {
                sum += vals[i].value * (13.515 / 2.20462);
            } else if (vals[i].key === "eggsVal") {
                sum += vals[i].value * (4.67 / 2.20462);
            } else if (vals[i].key === "seafoodVal") {
                sum += vals[i].value * (20.25 / 2.20462);
            } else if (vals[i].key === "meatVal") {
                sum += vals[i].value * (40.345 / 2.20462);
            } else if (vals[i].key === "nutsVal") {
                sum += vals[i].value * (1.83 / 2.20462);
            } else if (vals[i].key === "sugarVal") {
                sum += vals[i].value * (24.925 / 2.20462);
            } else if (vals[i].key === "coffeeVal") {
                sum += vals[i].value * (28.53 / 2.20462);
            } else if (vals[i].key === "wasteVal") {
                sum += vals[i].value * (3.5 / 2.20462);
            } else if (vals[i].key === "clothingVal") {
                sum += vals[i].value * (18.25 / 2.20462);
            }
        }
        
        for (let i = 0; i < carInfo.length; i++) {
            switch (carInfo[i].carType) {
                case "Gasoline":
                    sum += (Number(carInfo[i].milesDriven) / 22.9) * 8.89 / 0.993;
                    break;
                case "Hybrid":
                    sum += Number(carInfo[i].milesDriven) * 0.231;
                    break;
                case "Electric":
                    sum += (Number(carInfo[i].milesDriven) / 3.60) * 857 / 1000;
                    break;
            }
        }

        for (let i = 0; i < pubTransInfo.length; i++) {
            switch (pubTransInfo[i].pubTransType) {
                case "Bus":
                    sum += Number(pubTransInfo[i].milesTraveled) * 0.089;
                    break;
                case "Train":
                    sum += Number(pubTransInfo[i].milesTraveled) * 0.041;
                    break;
                case "Metro/Subway System":
                    sum += Number(pubTransInfo[i].milesTraveled) * 0.053;
                    break;
                case "Airplane":
                    sum += Number(pubTransInfo[i].milesTraveled) * 0.125;
                    break;
            }
        }

        setFootprintCalculated(sum);
        console.log(sum);

    }


    useEffect(() => {
        const handleSubmit = async () => {
            // Grab footprint calculation
            const footprint = {footprintCalculated};

            try {
                const response = await fetch("http://localhost:5000/storefootprint", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(footprint)
                });

                if (response.ok) {
                    alert("Footprint logged successfully");
                }
                else {
                    const errorData = await response.json();
                    alert(errorData.message || "Footprint log failed");
                }

            } catch (error) {
                console.error("Error:", error);
                alert("Error logging footprint");
            };


        };
        if (footprintCalculated !== 0) {
            handleSubmit();
        }
    }, [footprintCalculated]);

    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="calculator-form">
                <CardBody className="form-body">
                    <p>Provide the number of gallons of water consumed in your household from your latest water bill:</p>
                    <Input name="waterVal" id="waterValId" placeholder="x gallons over past 2 months" className="max-w-3xl input" variant="bordered" onChange={setNewUserInputs} value={userInputs.waterVal} />
                    
                    <p>Provide the number of gallons of gas consumed in your household from your latest gas bill:</p>
                    <Input name="gasVal" id="gasValId" placeholder="x gallons over past 2 months" className="max-w-3xl input" variant="bordered" onChange={setNewUserInputs} value={userInputs.gasVal} />
                    <p>Provide the number of kilowatt-hours of electricity consumed in your household from your latest electricity bill:</p>
                    <Input name="electricityVal" id="electricityValId" placeholder="x kilowatt-hours over past 2 months" className="max-w-3xl input" variant="bordered" onChange={setNewUserInputs} value={userInputs.electricityVal} />
                    
                    <div className="flex flex-col">
                        <p>If you have used one or more cars this week, add them below: </p>
                        <div className="flex flex-col">
                            {carInfo.map((carInfo, index) => (
                                <div className="flex flex-row" key={index}>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button className="type-button">{carInfo.carType ? carInfo.carType : "Car Type"}</Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            disallowEmptySelection
                                            selectionMode="single"
                                            onSelectionChange={(key) => handleCarInfoChange(index, "carType", Array.from(key)[0])}
                                        >
                                            <DropdownItem value="Gasoline"  key="Gasoline">Gasoline</DropdownItem>
                                            <DropdownItem value="Hybrid" key="Hybrid">Hybrid</DropdownItem>
                                            <DropdownItem value="Electric" key="Electric">Electric</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Input 
                                        name="milesDriven"
                                        value={carInfo.milesDriven} 
                                        onChange={(e) => handleCarInfoChange(index, e.target.name, e.target.value)}
                                        placeholder="How many miles have you traveled using this car this week?"
                                        className="max-w-xl input" 
                                        variant="bordered"/>
                                    <Button isIconOnly className="minus-button" onClick={() => handleRemoveCar(index)}>
                                    <MinusIcon />
                                    </Button>
                                </div>
                            ))}
                            <Button className="add-car-button" onClick={handleAddCar}>Add Another Car</Button>
                        </div>

                        <p>If you have taken one or more forms of public transportation this week, add them below: </p>
                        <div className="flex flex-col">
                            {pubTransInfo.map((pubTransInfo, index) => (
                                <div className="flex flex-row" key={index}>
                                    <Dropdown>
                                        <DropdownTrigger>
                                        <Button className="type-button">{pubTransInfo.pubTransType ? pubTransInfo.pubTransType : "Public Transport Type"}</Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            disallowEmptySelection
                                            selectionMode="single"
                                            onSelectionChange={(key) => handlePubTransInfoChange(index, "pubTransType", Array.from(key)[0])}
                                        >
                                            <DropdownItem key="Bus">Bus</DropdownItem>
                                            <DropdownItem key="Train">Train</DropdownItem>
                                            <DropdownItem key="Metro/Subway System">Metro/Subway System</DropdownItem>
                                            <DropdownItem key="Airplane">Airplane</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Input 
                                        name="milesTraveled"
                                        value={pubTransInfo.milesTraveled} 
                                        onChange={(e) => handlePubTransInfoChange(index, e.target.name, e.target.value)}
                                        placeholder="How many miles have you traveled using this form of public transportation this week?"
                                        className="max-w-xl input"
                                        variant="bordered" />
                                    <Button className="minus-button" isIconOnly onClick={() => handleRemovePubTrans(index)}>
                                    <MinusIcon />
                                    </Button>
                                </div>
                            ))}
                            <Button className="add-transportation-button" onClick={handleAddPubTrans}>Add Another Form of Public Transportation</Button>
                        </div>

                        <p>Enter the quantities of each category of food that you have purchased this week:</p>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <p className="food-type-name">Grains</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="grainsVal" id="grainsValId" onChange={setNewUserInputs} value={userInputs.grainsVal} />
                            </div>
                            <div className="flex flex-col">
                                <p className="food-type-name">Legumes</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="legumesVal" id="legumesValId" onChange={setNewUserInputs} value={userInputs.legumesVal} />
                            </div>
                            <div className="flex flex-col">
                                <p className="food-type-name">Fruit</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="fruitVal" id="fruitValId" onChange={setNewUserInputs} value={userInputs.fruitVal} />
                            </div>
                            <div className="flex flex-col">
                                <p className="food-type-name">Vegetables</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="vegetablesVal" id="vegetablesValId" onChange={setNewUserInputs} value={userInputs.vegetablesVal} />
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <p className="food-type-name">Non-Dairy Milk</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="nonDairyMilkVal" id="nonDairyMilkValId" onChange={setNewUserInputs} value={userInputs.nonDairyMilkVal} />
                            </div>
                            <div className="flex flex-col">
                                <p className="food-type-name">Dairy Products</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="dairyVal" id="dairyValId" onChange={setNewUserInputs} value={userInputs.dairyVal} />
                            </div>
                            <div className="flex flex-col">
                                <p className="food-type-name">Eggs</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="eggsVal" id="eggsValId" onChange={setNewUserInputs} value={userInputs.eggsVal} />
                            </div>
                            <div className="flex flex-col">
                                <p className="food-type-name">Fish & Seafood</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="seafoodVal" id="seafoodValId" onChange={setNewUserInputs} value={userInputs.seafoodVal} />
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <p className="food-type-name">Meat Products</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="meatVal" id="meatValId" onChange={setNewUserInputs} value={userInputs.meatVal} />
                            </div>
                            <div className="flex flex-col">
                                <p className="food-type-name">Nuts</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="nutsVal" id="nutsValId" onChange={setNewUserInputs} value={userInputs.nutsVal} />
                            </div>
                            <div className="flex flex-col">
                                <p className="food-type-name">Sugar & Chocolate</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="sugarVal" id="sugarValId" onChange={setNewUserInputs} value={userInputs.sugarVal} />
                            </div>
                            <div className="flex flex-col">
                                <p className="food-type-name">Coffee</p>
                                <Input className="food-type-input" variant="bordered" placeholder="x kilograms" name="coffeeVal" id="coffeeValId" onChange={setNewUserInputs} value={userInputs.coffeeVal} />
                            </div>
                        </div>

                        <p className="text">How many pounds of landfill waste have you generated this week (not including recycled or composed trash)?</p>
                        <Input className="max-w-3xl" variant="bordered" placeholder="x pounds" name="wasteVal" id="wasteValId" onChange={setNewUserInputs} value={userInputs.wasteVal} />

                        <p className="text">How many pounds of clothing products have you purchased this week?</p>
                        <Input className="max-w-3xl" variant="bordered" placeholder="x pounds" name="clothingVal" id="clothingValId" onChange={setNewUserInputs} value={userInputs.clothingVal} />

                        <Button className="submit-button"onClick={calculateEmissions}>Submit</Button>
                    </div>
                    {footprintCalculated === 0 ? null : <h1 className="result-text">This Week's Carbon Footprint: {footprintCalculated}</h1>}
                </CardBody>
            </Card>
        </div>
        </>
    )
}