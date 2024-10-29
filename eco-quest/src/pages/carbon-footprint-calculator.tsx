import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import PlusIcon from '../icons/plus-icon.tsx'
import MinusIcon from '../icons/minus-icon.tsx'

export function CarbonFootprintCalculator() {
    const [carInfo, setCarInfo] = useState([{carType: "", milesDriven: "", id: 0}]);
    const [pubTransInfo, setPubTransInfo] = useState([{pubTransType: "", milesTraveled: "", id: 0}])

    const [userInputs, setUserInputs] = useState({waterVal: "", gasVal: "", electricityVal: "", carInfoVal: {carInfo}, pubTransInfoVal: {pubTransInfo}, grainsVal: "", legumesVal: "", fruitVal: "", vegetablesVal: "", nonDairyMilkVal: "", dairyVal: "", eggsVal: "", seafoodVal: "", meatVal: "", nutsVal: "", sugarVal: "", coffeeVal: "", wasteVal: "", clothingVal: ""});
    const setNewUserInputs = ((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserInputs(prevUserInputs => ({...prevUserInputs, [e.target.name]: e.target.value}));
        console.log(userInputs);
    });
    // const handleCar = () => {
    //     setHasCar(true);
    // }

    const [selectedCarType, setSelectedCarType] = React.useState(new Set(["Car Type"]));
    const selectedCarTypeValue = React.useMemo(
        () => Array.from(selectedCarType).join(", "),
        [selectedCarType]
      );
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("CarInfo", carInfo);
    // };
    // const handleChangeCarInfoInput = (index, event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newCarInfo = carInfo.map(i => {
    //         if(index == i.index) {
    //           i[event.target.name] = event.target.value
    //         }
    //         return i;
    //       })
          
    //       setCarInfo(newCarInfo);
    const addCarInfo = () => {
        let tempCarInfo = [...carInfo]
        tempCarInfo.push({
            carType: "",
            milesDriven: "",
            id: 1
        })
        setCarInfo(tempCarInfo)
        // const values = [...carInfo];
        // values[index][event.target.name] = event.target.value;
        // setCarInfo(values);

    }

    const [selectedPubTransType, setSelectedPubTransType] = React.useState(new Set(["Public Transportation Type"]));
    const selectedPubTransTypeValue = React.useMemo(
        () => Array.from(selectedPubTransType).join(", "),
        [selectedPubTransType]
      );
    // const handleNumCars= (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = parseInt(e.target.value);
    //     setNumCars(value);
    //     console.log(value);
    // }

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
                                <DropdownTrigger>
                                    <Button variant="bordered">{selectedCarTypeValue}</Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedCarType}
                                    onSelectionChange={setSelectedCarType}
                                >
                                    <DropdownItem key="Gasoline">Gasoline</DropdownItem>
                                    <DropdownItem key="Hybrid">Hybrid</DropdownItem>
                                    <DropdownItem key="Electric">Electric</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Input placeholder="How many miles have you traveled using this form of public transportation this week?" value={carInfo.milesDriven} className="max-w-xl" />
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
                                    onSelectionChange={setSelectedPubTransType}
                                >
                                    <DropdownItem key="Bus">Bus</DropdownItem>
                                    <DropdownItem key="Train">Train</DropdownItem>
                                    <DropdownItem key="Metro/Subway System">Metro/Subway System</DropdownItem>
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

                        <Button>Submit</Button>
                    </div>
                    {/* {hasCar ? (
                        

                        // <div>
                        //     <p>How many cars do you have?</p>
                        //     <Input type="number" value={numCars?.toString()} onChange={handleNumCars} placeholder="x cars"></Input>
                        //     {for(let i = 0; i < numCars; i++) {
                                
                        //     }}

                        //         <p>Car #1</p>
                        //         <div className="flex">
                        //             <p>What type of car is it?</p>
                        //             <Button>Gasoline</Button>
                        //             <Button>Hybrid</Button>
                        //             <Button>Electric</Button>
                        //         </div>
                        //         <p>How many gallons of gasoline did you fill in the tank of this car this week?</p>
                        //             <Input placeholder="x cars"></Input>
                        // </div>
                    ):
                        <div></div>
                    }
                    <div>
                        <p>Have you used public transportation this week?</p>
                        <Button onClick={handleCar}>Yes</Button>
                        <Button>No</Button>
                     </div> */}
                    
                </CardBody>
            </Card>
        </div>
        </>
        // <h1>This is the carbon footprint calculator page</h1>
    )
}