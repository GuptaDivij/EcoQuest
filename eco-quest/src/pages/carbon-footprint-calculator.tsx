import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import PlusIcon from '../icons/plus-icon.tsx'
import MinusIcon from '../icons/minus-icon.tsx'

export function CarbonFootprintCalculator() {

    const [userInputs, setUserInputs] = useState({waterVal: "", gasVal: "", electricityVal: "", carInfo: {carType: "", milesDriven: ""}, grainsVal: "", legumesVal: "", fruitVal: "", vegetablesVal: "", nonDairyMilkVal: "", dairyVal: "", eggsVal: "", seafoodVal: "", meatVal: "", nutsVal: "", sugarVal: "", coffeeVal: "", wasteVal: "", clothingVal: ""});
    const setNewUserInputs = ((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserInputs(prevUserInputs => ({...prevUserInputs, [e.target.name]: e.target.value}));
        console.log(userInputs);
    });

    const [selectedCarType, setSelectedCarType] = React.useState(new Set(["Car Type"]));
    const [carInfo, setCarInfo] = useState([{carType: "", milesDriven:""}]);

    const [selectedPubTransType, setSelectedPubTransType] = React.useState(new Set(["Public Transportation Type"]));
    const [pubTransInfo, setPubTransInfo] = useState([{pubTransType: "", milesTraveled: ""}])
    
    const selectedPubTransTypeValue = React.useMemo(
        () => Array.from(selectedPubTransType).join(", "),
        [selectedPubTransType]
      );
    
    const [footprintCalculated, setFootprintCalculated] = useState(0);
    const calculateEmissions = () => {
        let vals: {key: string, value: number}[] = [];
        let sum: number = 0;
        Object.entries(userInputs).forEach(([key, value]) => {
            vals.push({key: key, value: Number(value)});
        });

        for (let i = 0; i < vals.length; i++) {
            if(vals[i].key == "waterVal") {
                sum += (vals[i].value / 8.69049) * 0.18; // # gallons of water used in two months / # of weeks in two months (gallons of water used per week) * kg of co2 produced per gallon
            } else if (vals[i].key == "gasVal") {
                sum += (vals[i].value / 8.69049) * 8.887; // # gallons of gas used in two months / # of weeks in two months (gallons of water used per week) * kg of co2 produced per gallon 
            } else if (vals[i].key == "electrictyVal") {
                sum += (vals[i].value / 8.69049) * 0.417; // # kilowatt-hours of electricity used in two months / # of weeks in two months (kilowatt-hours of electricity used per week) * kg of co2 produced per kilowatt-hour 
            } else if (vals[i].key == "grainsVal") {
                sum += vals[i].value * (2.27 / 2.20462);
            } else if (vals[i].key == "legumesVal") {
                sum += vals[i].value * (1.9766666667 / 2.20462);
            } else if (vals[i].key == "fruitVal") {
                sum += vals[i].value * (1.05833333333 / 2.20462);
            } else if (vals[i].key == "vegetablesVal") {
                sum += vals[i].value * (0.625 / 2.20462);
            } else if (vals[i].key == "nonDairyMilkVal") {
                sum += vals[i].value * (0.6233333333 / 2.20462);
            } else if (vals[i].key == "dairyVal") {
                sum += vals[i].value * (13.515 / 2.20462);
            } else if (vals[i].key == "eggsVal") {
                sum += vals[i].value * (4.67 / 2.20462);
            } else if (vals[i].key == "seafoodVal") {
                sum += vals[i].value * (20.25 / 2.20462);
            } else if (vals[i].key == "meatVal") {
                sum += vals[i].value * (40.345 / 2.20462);
            } else if (vals[i].key == "nutsVal") {
                sum += vals[i].value * (1.83 / 2.20462);
            } else if (vals[i].key == "sugarVal") {
                sum += vals[i].value * (24.925 / 2.20462);
            } else if (vals[i].key == "coffeeVal") {
                sum += vals[i].value * (28.53 / 2.20462);
            } else if (vals[i].key == "wasteVal") {
                sum += vals[i].value * (3.5 / 2.20462);
            } else if (vals[i].key == "clothingVal") {
                sum += vals[i].value * (18.25 / 2.20462);
            }
        }
        
        setFootprintCalculated(sum);
        console.log(sum);
    }


    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card>
                <CardBody>
                    <p>Provide the number of gallons of water consumed in your household from your latest water bill:</p>
                    <Input name="waterVal" id="waterValId" placeholder="x gallons" className="max-w-xs" onChange={setNewUserInputs} value={userInputs.waterVal} />
                    
                    <p>Provide the number of gallons of gas consumed in your household from your latest gas bill:</p>
                    <Input name="gasVal" id="gasValId" placeholder="x gallons" className="max-w-xs" onChange={setNewUserInputs} value={userInputs.gasVal} />
                    <p>Provide the number of kilowatt-hours of electricity consumed in your household from your latest electricity bill:</p>
                    <Input name="electricityVal" id="electricityValId" placeholder="x kilowatt-hours" className="max-w-xs" onChange={setNewUserInputs} value={userInputs.electricityVal} />
                    <div className="flex flex-col">
                        <p>If you have used one or more cars this week, add them below: </p>
                        {/* <Button onClick={handleCar}>Yes</Button>
                        <Button>No</Button> */}
                        <div className="flex flex-row">
                        {carInfo.map((carInfo, index) => (
                            <div className="flex flex-row" key={index}>
                            <Dropdown>
                                <DropdownTrigger
                                // value={userInputs.carInfo.carType} 
                                // onChange={(e) => handleCarInfoChange(e, index)}
                                >
                                    <Button variant="bordered">{selectedCarType}</Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    selectionMode="single"
                                    // selectedKeys={selectedCarType}
                                    // onSelectionChange={setSelectedCarType}

                                >
                                    <DropdownItem value="Gasoline"  key="Gasoline">Gasoline</DropdownItem>
                                    <DropdownItem value="Hybrid" key="Hybrid">Hybrid</DropdownItem>
                                    <DropdownItem value="Electric" key="Electric">Electric</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Input 
                                value={userInputs.carInfo.milesDriven} 
                                // onChange={(e) => handleCarInfoChange(e, index)}
                                placeholder="How many miles have you traveled using this form of public transportation this week?" value={carInfo.milesDriven} className="max-w-xl" />
                        </div>
                        ))}
                        <Button isIconOnly>
                            <PlusIcon />
                        </Button>
                        <Button isIconOnly>
                            <MinusIcon />
                        </Button>
                        </div>
                        
                        <p>If you have taken one or more forms of public transportation this week, add them below: </p>
                        {/* <Button onClick={handleCar}>Yes</Button>
                        <Button>No</Button> */}
                        <div className="flex flex-row">
                        {pubTransInfo.map((pubTransInfo, index) => (
                            <div className="flex flex-row" key={index}>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="bordered">{selectedPubTransTypeValue}</Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedPubTransType}
                                    // onSelectionChange={setSelectedPubTransType}
                                >
                                    <DropdownItem key="Bus">Bus</DropdownItem>
                                    <DropdownItem key="Train">Train</DropdownItem>
                                    <DropdownItem key="Metro/Subway System">Metro/Subway System</DropdownItem>
                                    <DropdownItem key="Airplane">Airplane</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Input placeholder="How many miles have you traveled using this form of public transportation this week?" value={pubTransInfo.milesTraveled} className="max-w-xl" />
                        </div>
                        ))}
                        <Button isIconOnly>
                            <PlusIcon />
                        </Button>
                        <Button isIconOnly>
                            <MinusIcon />
                        </Button>
                        </div>

                        <p>Enter the quantities of each category of food that you have purchased this week:</p>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <p>Grains</p>
                                <Input placeholder="x kilograms" name="grainsVal" id="grainsValId" onChange={setNewUserInputs} value={userInputs.grainsVal} />
                            </div>
                            <div className="flex flex-col">
                                <p>Legumes</p>
                                <Input placeholder="x kilograms" name="legumesVal" id="legumesValId" onChange={setNewUserInputs} value={userInputs.legumesVal} />
                            </div>
                            <div className="flex flex-col">
                                <p>Fruit</p>
                                <Input placeholder="x kilograms" name="fruitVal" id="fruitValId" onChange={setNewUserInputs} value={userInputs.fruitVal} />
                            </div>
                            <div className="flex flex-col">
                                <p>Vegetables</p>
                                <Input placeholder="x kilograms" name="vegetablesVal" id="vegetablesValId" onChange={setNewUserInputs} value={userInputs.vegetablesVal} />
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <p>Non-Dairy Milk</p>
                                <Input placeholder="x kilograms" name="nonDairyMilkVal" id="nonDairyMilkValId" onChange={setNewUserInputs} value={userInputs.nonDairyMilkVal} />
                            </div>
                            <div className="flex flex-col">
                                <p>Dairy Products</p>
                                <Input placeholder="x kilograms" name="dairyVal" id="dairyValId" onChange={setNewUserInputs} value={userInputs.dairyVal} />
                            </div>
                            <div className="flex flex-col">
                                <p>Eggs</p>
                                <Input placeholder="x kilograms" name="eggsVal" id="eggsValId" onChange={setNewUserInputs} value={userInputs.eggsVal} />
                            </div>
                            <div className="flex flex-col">
                                <p>Fish & Seafood</p>
                                <Input placeholder="x kilograms" name="seafoodVal" id="seafoodValId" onChange={setNewUserInputs} value={userInputs.seafoodVal} />
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <p>Meat Products</p>
                                <Input placeholder="x kilograms" name="meatVal" id="meatValId" onChange={setNewUserInputs} value={userInputs.meatVal} />
                            </div>
                            <div className="flex flex-col">
                                <p>Nuts</p>
                                <Input placeholder="x kilograms" name="nutsVal" id="nutsValId" onChange={setNewUserInputs} value={userInputs.nutsVal} />
                            </div>
                            <div className="flex flex-col">
                                <p>Sugar & Chocolate</p>
                                <Input placeholder="x kilograms" name="sugarVal" id="sugarValId" onChange={setNewUserInputs} value={userInputs.sugarVal} />
                            </div>
                            <div className="flex flex-col">
                                <p>Coffee</p>
                                <Input placeholder="x kilograms" name="coffeeVal" id="coffeeValId" onChange={setNewUserInputs} value={userInputs.coffeeVal} />
                            </div>
                        </div>

                        <p>How many pounds of landfill waste have you generated this week (not including recycled or composed trash)?</p>
                        <Input placeholder="x pounds" name="wasteVal" id="wasteValId" onChange={setNewUserInputs} value={userInputs.wasteVal} />

                        <p>How many pounds of clothing products have you purchased this week?</p>
                        <Input placeholder="x pounds" name="clothingVal" id="clothingValId" onChange={setNewUserInputs} value={userInputs.clothingVal} />

                        <Button onClick={calculateEmissions}>Submit</Button>
                    </div>
                    {footprintCalculated ! == 0 ? null : <h1>Your total Carbon Footprint for this week was: {footprintCalculated}</h1>}
                </CardBody>
            </Card>
        </div>
        </>
    )
}