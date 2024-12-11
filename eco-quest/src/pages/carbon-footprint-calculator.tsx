import React, {useState, useEffect} from "react";
import {Card, CardBody} from "@nextui-org/card";
import {Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link} from "@nextui-org/react";
import MinusIcon from '../icons/minus-icon.tsx';
import './carbon-footprint-calculator.css';
import { useNavigate } from 'react-router-dom';

export function CarbonFootprintCalculator() {
    const [loggedIn, setLoggedIn] = useState(false);

    // Check if the user is logged in, to store footprint data
    useEffect(() => {
        fetch("http://localhost:5000/session", {
        method: "GET",
        credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => setLoggedIn(data.loggedIn))
        .catch((err) => console.error("Error fetching session:", err));
    }, []);


    const [gasCarUsage, setGasCarUsage] = useState(0);
    const [electricCarUsage, setElectricCarUsage] = useState(0);
    const [hybridCarUsage, setHybridCarUsage] = useState(0);
    const [busUsage, setBusUsage] = useState(0);
    const [trainUsage, setTrainUsage] = useState(0);
    const [metroUsage, setMetroUsage] = useState(0);
    const [airplaneUsage, setAirplaneUsage] = useState(0);
    
    const navigate = useNavigate();

    const [userInputs, setUserInputs] = useState({waterVal: "", gasVal: "", electricityVal: "", grainsVal: "", legumesVal: "", fruitVal: "", vegetablesVal: "", nonDairyMilkVal: "", dairyVal: "", eggsVal: "", seafoodVal: "", meatVal: "", nutsVal: "", sugarVal: "", coffeeVal: "", wasteVal: "", clothingVal: ""});
    const setNewUserInputs = ((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserInputs(prevUserInputs => ({...prevUserInputs, [e.target.name]: e.target.value}));
        console.log(userInputs);
    });

    const [carInfo, setCarInfo] = useState([{carType: "", milesDriven:""}]);
    const [pubTransInfo, setPubTransInfo] = useState([{pubTransType: "", milesTraveled: ""}]);

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
                sum += ((vals[i].value / 8.69049) * 0.18) / 2204.62; // # of gallons of water used in two months / 8.69049 (average number of weeks in two months) = average # of gallons of water used in a week
                                                                    // Average # of gallons of water used in a week * 0.18 lb of CO2 produced per gallon = # of lbs of CO2 produced from water in a week
                                                                    //# of lbs of CO2 produced from water in a week / 2,204.62 (conversion factor for lbs to metric tons) = # of metric tons of CO2 produced from water in a week
            } else if (vals[i].key === "gasVal") {
                sum += ((vals[i].value / 8.69049) * 8.887) / 1000;  // # of gallons of gasoline used in two months / 8.69049 (average number of weeks in two months) = average # of gallons of gasoline used in a week
                                                                    // Average # of gallons of gasoline used in a week * 8.887 kilograms of CO2 produced per gallon = # of kilograms of CO2 produced from gasoline in a week
                                                                    // # of kilograms of CO2 produced from gasoline in a week / 1,000 (conversion factor for kilograms to metric tons) = # of metric tons of CO2 produced from gasoline in a week
        
            } else if (vals[i].key === "electrictyVal") {
                sum += ((vals[i].value / 8.69049) * 0.394) / 1000; // # of kilowatt-hours of electricity used in two months / 8.69049 (average number of weeks in two months) = average # of kilowatt-hours of electricity used in a week
                                                                    // Average # of kilowatt-hours of electricity used in a week * 0.394 kilograms of CO2 produced per kilowatt-hour = # of kilograms of CO2 produced from electricity in a week
                                                                    // # of kilograms of CO2 produced from electricity in a week / 1,000 (conversion factor for kilograms to metric-tons) =  # of metric tons of CO2 produced from electricity in a week
            } else if (vals[i].key === "grainsVal") {
                sum += (vals[i].value * 2.27) / 1000; // # of kg of grain products purchased this week * 2.27 kg of CO2 produced per kg of grain products = # of kg of CO2 produced for grain products this week
                                                        // # of kg of CO2 produced for grain products this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from grain products this week
            } else if (vals[i].key === "legumesVal") {
                sum += (vals[i].value * 1.9766666667) / 1000; // # of kg of legumes purchased this week * 1.9766666667 kg of CO2 produced per kg of legumes = # of kg of CO2 produced for legumes this week
                                                                // # of kg of CO2 produced for legumes this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from legumes this week
            } else if (vals[i].key === "fruitVal") {
                sum += (vals[i].value * 1.05833333333) / 1000; // # of kg of fruit purchased this week * 1.05833333333 kg of CO2 produced per kg of fruit = # of kg of CO2 produced for fruit this week
                                                                // # of kg of CO2 produced for fruit this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from fruit this week  
            } else if (vals[i].key === "vegetablesVal") {
                sum += (vals[i].value * 0.625) / 1000; // # of kg of vegetables purchased this week * 0.625 kg of CO2 produced per kg of vegetables = # of kg of CO2 produced for vegetables this week
                                                        // # of kg of CO2 produced for vegetables this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from vegetables this week   
            } else if (vals[i].key === "nonDairyMilkVal") {
                sum += (vals[i].value * 0.6233333333) / 1000; // # of kg of non-dairy milk products purchased this week * 0.6233333333 kg of CO2 produced per kg of non-dairy milk products = # of kg of CO2 produced for non-dairy milk products this week
                                                                // # of kg of CO2 produced for non-dairy milk products this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from non-dairy milk products this week  
            } else if (vals[i].key === "dairyVal") {
                sum += (vals[i].value * 13.515) / 1000; // # of kg of dairy products purchased this week * 13.515 kg of CO2 produced per kg of dairy products = # of kg of CO2 produced for dairy products this week
                                                        // # of kg of CO2 produced for dairy products this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from dairy products this week 
            } else if (vals[i].key === "eggsVal") {
                sum += (vals[i].value * 4.67) / 1000; // # of kg of eggs purchased this week * 4.67 kg of CO2 produced per kg of eggs = # of kg of CO2 produced for eggs this week
                                                        // # of kg of CO2 produced for eggs this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from eggs this week  
            } else if (vals[i].key === "seafoodVal") {
                sum += (vals[i].value * 20.25) / 1000; // # of kg of fish and seafood purchased this week * 20.25 kg of CO2 produced per kg of fish and seafood = # of kg of CO2 produced for fish and seafood this week
                                                        // # of kg of CO2 produced for fish and seafood this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from fish and seafood this week
            } else if (vals[i].key === "meatVal") {
                sum += (vals[i].value * 40.345) / 1000; // # of kg of meat products purchased this week * 40.345 kg of CO2 produced per kg of meat products = # of kg of CO2 produced for meat products this week
                                                        // # of kg of CO2 produced for meat products this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from meat products this week 
            } else if (vals[i].key === "nutsVal") {
                sum += (vals[i].value * 1.83) / 1000; // # of kg of nuts purchased this week * 1.83 kg of CO2 produced per kg of nuts = # of kg of CO2 produced for nuts this week
                                                    // # of kg of CO2 produced for nuts this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from nuts this week  
            } else if (vals[i].key === "sugarVal") {
                sum += (vals[i].value * 24.925) / 1000; // # of kg of sugar and chocolate purchased this week * 24.925 kg of CO2 produced per kg of sugar and chocolate = # of kg of CO2 produced for sugar and chocolate this week
                                                        // # of kg of CO2 produced for sugar and chocolate this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from sugar and chocolate this week 
            } else if (vals[i].key === "coffeeVal") {
                sum += (vals[i].value * 28.53) / 1000; // # of kg of coffee purchased this week * 28.53 kg of CO2 produced per kg of coffee = # of kg of CO2 produced for coffee this week
                                                        // # of kg of CO2 produced for coffee this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from coffee this week
            } else if (vals[i].key === "wasteVal") {
                sum += ((vals[i].value * 0.453592) * 3.5) / 1000; // # of pounds of landfill generated this week * 0.453592 (conversion factor for pounds to kilograms) = # of kilograms of landfill generated this week
                                                                    // # of kilograms of landfill generated this week * 3.5 kg of CO2 produced per kg of landfill = # of kg of CO2 generated this week from landfill
                                                                    // # of kg of CO2 generated this week from landfill / 1,000 (conversion factor from kg to metric tons) = # of  metric tons of CO2 produced from landfill this week
            } else if (vals[i].key === "clothingVal") {
                sum += ((vals[i].value * 0.453592) * 18.25) / 1000; // # of pounds of clothing purchased this week * 0.453592 (conversion factor for pounds to kilograms) = # of kilograms of clothing purchased this week
                                                                    // # of kilograms of clothing purchased this week * 18.25 kg of CO2 produced per kg of clothing = # of kg of CO2 generated this week from clothing
                                                                    // # of kg of CO2 generated this week from clothing / 1,000 (conversion factor from kg to metric tons) = # of  metric tons of CO2 produced from clothing this week
            
            }
        }

        console.log(vals);
        for (let i = 0; i < carInfo.length; i++) {
            switch (carInfo[i].carType) {
                case "Gasoline":
                    setGasCarUsage(Number(carInfo[i].milesDriven));
                    sum += ((Number(carInfo[i].milesDriven) * 0.4) / 1000); // # of miles traveled this week in a gas car * 0.4 kilograms of CO2 produced per mile = # of kilograms of CO2 produced from a gas car in a week
                                                                            // # of kilograms of CO2 produced from a gas car in a week / 1,000 (conversion factor for kilograms to metric-tons) = # of metric tons of CO2 produced from a gas car in a week
                    break;
                case "Hybrid":
                    setHybridCarUsage(Number(carInfo[i].milesDriven));
                    sum += ((Number(carInfo[i].milesDriven) * 0.231)/ 1000); // # of miles traveled this week in a hybrid car * 0.231 kilograms of CO2 produced per mile = # of kilograms of CO2 produced from a hybrid car in a week
                                                                            // # of kilograms of CO2 produced from a hybrid car in a week / 1,000 (conversion factor for kilograms to metric tons) = # of metric tons of CO2 produced from a hybrid car in a week
                
                    break;
                case "Electric":
                    setElectricCarUsage(Number(carInfo[i].milesDriven));
                    sum += 0; // Electric cars do not produce any carbon emissions
                    break;
            }
        }

        for (let i = 0; i < pubTransInfo.length; i++) {
            switch (pubTransInfo[i].pubTransType) {
                case "Bus":
                    setBusUsage(Number(pubTransInfo[i].milesTraveled));
                    sum += (Number(pubTransInfo[i].milesTraveled) * 0.089) / 1000; // # of miles traveled by bus this week * 0.089 kg of CO2 produced per mile = # of kg of CO2 produced from a bus this week
                                                                                    // # of kg of CO2 produced from a bus this week / 1,000 (conversion factor from kg to metric tons = # of metric-tons of CO2 produced from a bus this week
                    break;
                case "Train":
                    setTrainUsage(Number(pubTransInfo[i].milesTraveled));
                    sum += (Number(pubTransInfo[i].milesTraveled) * 0.041) / 1000; // # of miles traveled by train this week * 0.041 kg of CO2 produced per mile = # of kg of CO2 produced from a train this week
                                                                                    // # of kg of CO2 produced from a train this week / 1,000 (conversion factor from kg to metric tons = # of metric-tons of CO2 produced from a train this week     
                    break;
                case "Metro/Subway System":
                    setMetroUsage(Number(pubTransInfo[i].milesTraveled));
                    sum += (Number(pubTransInfo[i].milesTraveled) * 0.053) / 1000; // # of miles traveled by metro/subway system this week * 0.053 kg of CO2 produced per mile = # of kg of CO2 produced from a metro/subway system this week
                                                                                    // # of kg of CO2 produced from a metro/subway system this week / 1,000 (conversion factor from kg to metric tons = # of metric-tons of CO2 produced from a metro/subway system this week
                    break;
                case "Airplane":
                    setAirplaneUsage(Number(pubTransInfo[i].milesTraveled));
                    sum += (Number(pubTransInfo[i].milesTraveled) * 0.125) / 1000; // # of miles traveled by airplane this week * 0.125 kg of CO2 produced per mile = # of kg of CO2 produced from an airplane this week
                                                                                    // # of kg of CO2 produced from an airplane this week / 1,000 (conversion factor from kg to metric tons = # of metric-tons of CO2 produced from an airplane this week
                    break;
            }
        }
        console.log(carInfo);
        setFootprintCalculated(sum);
        console.log(sum);

    }


    useEffect(() => {
        let waterVal: number = 0;
        let gasVal: number = 0;
        let electricityVal: number = 0;
        let grainsVal: number = 0;
        let legumesVal: number = 0;
        let fruitVal: number = 0;
        let vegetablesVal: number = 0;
        let nonDairyMilkVal: number = 0;
        let dairyVal: number = 0;
        let eggsVal: number = 0;
        let seafoodVal: number = 0;
        let meatVal: number = 0;
        let nutsVal: number = 0;
        let sugarVal: number = 0;
        let coffeeVal: number = 0;
        let wasteVal: number = 0;
        let clothingVal: number = 0;
        let gasolineCarVal: number = 0;
        let hybridCarVal: number = 0;
        let electricCarVal: number = 0;
        let busPubTransVal: number = 0;
        let trainPubTransVal: number = 0;
        let metroPubTransVal: number = 0;
        let airplanePubTransVal: number = 0;

        let userInput = {waterVal, gasVal, electricityVal, grainsVal, legumesVal, fruitVal, vegetablesVal, nonDairyMilkVal, dairyVal, eggsVal, seafoodVal, meatVal, nutsVal, sugarVal, coffeeVal, wasteVal, clothingVal}

        // Get individual user values
        let vals: {key: string, value: number}[] = [];
        Object.entries(userInputs).forEach(([key, value]) => {
            vals.push({key: key, value: Number(value)});
        });
        for (let i = 0; i < vals.length; i++) {
            if (vals[i].key in userInput) {
                userInput[vals[i].key] = vals[i].value
            }
        }

        for (let i = 0; i < carInfo.length; i++) {
            switch (carInfo[i].carType) {
                case "Gasoline":
                    gasolineCarVal += Number(carInfo[i].milesDriven);
                    break;
                case "Hybrid":
                    hybridCarVal += Number(carInfo[i].milesDriven);
                    break;
                case "Electric":
                    electricCarVal += Number(carInfo[i].milesDriven);
                    break;
            }
        }

        for (let i = 0; i < pubTransInfo.length; i++) {
            switch (pubTransInfo[i].pubTransType) {
                case "Bus":
                    busPubTransVal += Number(pubTransInfo[i].milesTraveled);
                    break;
                case "Train":
                    trainPubTransVal += Number(pubTransInfo[i].milesTraveled);
                    break;
                case "Metro/Subway System":
                    metroPubTransVal += Number(pubTransInfo[i].milesTraveled);
                    break;
                case "Airplane":
                    airplanePubTransVal += Number(pubTransInfo[i].milesTraveled);
                    break;
            }
        }

        const handleSubmit = async () => {
            // Get timestamp for logging purposes
            const date = new Date();
            // Convert to PST
            const pstDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

            const dynamicFormData: { [key: string]: number } = {};
            vals.forEach((val) => {
                dynamicFormData[val.key] = val.value;
            });

            const dynamicVehicleData: { [key: string]: number } = {};
            carInfo.forEach((val) => {
                dynamicVehicleData[val.carType] = Number(val.milesDriven);
            });

            const dynamicTransportationData: { [key: string]: number } = {};
            pubTransInfo.forEach((val) => {
                dynamicVehicleData[val.pubTransType] = Number(val.milesTraveled);
            });


            // Grab footprint calculation

            const footprint = {timestamp : pstDate, footprintCalculated,
                waterVal: dynamicFormData['waterVal'], gasVal: dynamicFormData['gasVal'], electricityVal: dynamicFormData['electricityVal'],
                grainsVal: dynamicFormData['grainsVal'], legumesVal: dynamicFormData['legumesVal'], fruitVal: dynamicFormData['fruitVal'],
                vegetablesVal: dynamicFormData['vegetablesVal'], nonDairyMilkVal: dynamicFormData['nonDairyMilkVal'], dairyVal: dynamicFormData['dairyVal'],
                eggsVal: dynamicFormData['eggsVal'], seafoodVal: dynamicFormData['seafoodVal'], meatVal: dynamicFormData['meatVal'], nutsVal: dynamicFormData['nutsVal'],
                sugarVal: dynamicFormData['sugarVal'], coffeeVal: dynamicFormData['coffeeVal'], wasteVal: dynamicFormData['wasteVal'], clothingVal: dynamicFormData['clothingVal'],
                gasolineCarVal: gasCarUsage, hybridCarVal: hybridCarUsage, electricCarVal: electricCarUsage,
                busPubTransVal: busUsage, trainPubTransVal: trainUsage, 
                metroPubTransVal: metroUsage, airplanePubTransVal: airplaneUsage,
            };

            // Store footprint calculation in database if user is logged in
            if (loggedIn) {
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
                navigate('/profile', { state: vals });
            }
        };
        if (footprintCalculated !== 0 || Object.values(userInput).some(val => val !== 0)) 
        {
            handleSubmit();
        }
    }, [footprintCalculated]);

    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 calculator">
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
                    {footprintCalculated === 0 ? null : <h1 className="result-text">This Week's Carbon Footprint: {footprintCalculated} metric tons of CO2</h1>}
                </CardBody>
            </Card>

            <Card className="calculation-card">
                <div className="calculation-content">
                    <p className="calculation-header">Here's how we calculated your carbon footprint!</p>
                
                    <p className="calculation-section-header">Water</p>
                    <Link className="calculation-section-link" href="https://www.aquatell.ca/pages/how-household-water-usage-contributes-to-co2-emissions#:~:text=According%20to%20The%20Eco%20Guide,15%20minutes%20x%200.18%20lbs).">Carbon Emission Factor: 0.18 lb of CO2 per gallon</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of gallons of water used in two months / 8.69049 (average number of weeks in two months) = average # of gallons of water used in a week</p>
                        <p className="calculation-section-equation">Average # of gallons of water used in a week * 0.18 lb of CO2 produced per gallon = # of lbs of CO2 produced from water in a week</p>
                        <p className="calculation-section-equation"># of lbs of CO2 produced from water in a week / 2,204.62 (conversion factor for lbs to metric tons) = # of metric tons of CO2 produced from water in a week</p>
                    </div>

                    <p className="calculation-section-header">Gasoline</p>
                    <Link className="calculation-section-link" href="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references#:~:text=To%20determine%20annual%20greenhouse%20gas,methane%20and%20nitrous%20oxide%20emissions">Carbon Emission Factor: 8.887 kilograms of CO2 per gallon</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of gallons of gasoline used in two months / 8.69049 (average number of weeks in two months) = average # of gallons of gasoline used in a week</p>
                        <p className="calculation-section-equation">Average # of gallons of gasoline used in a week * 8.887 kilograms of CO2 produced per gallon = # of kilograms of CO2 produced from gasoline in a week</p>
                        <p className="calculation-section-equation"># of kilograms of CO2 produced from gasoline in a week / 1,000 (conversion factor for kilograms to metric tons) = # of metric tons of CO2 produced from gasoline in a week</p>
                    </div>
                
                    <p className="calculation-section-header">Electricity</p>
                    <Link className="calculation-section-link" href="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references#:~:text=To%20determine%20annual%20greenhouse%20gas,methane%20and%20nitrous%20oxide%20emissions">Carbon Emission Factor: 0.394 kilograms of CO2 per gallon</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kilowatt-hours of electricity used in two months / 8.69049 (average number of weeks in two months) = average # of kilowatt-hours of electricity used in a week</p>
                        <p className="calculation-section-equation">Average # of kilowatt-hours of electricity used in a week * 0.394 kilograms of CO2 produced per kilowatt-hour = # of kilograms of CO2 produced from electricity in a week</p>
                        <p className="calculation-section-equation"># of kilograms of CO2 produced from electricity in a week / 1,000 (conversion factor for kilograms to metric-tons) =  # of metric tons of CO2 produced from electricity in a week</p>
                    </div>

                    <p className="calculation-section-header">Gasoline Car</p>
                    <Link className="calculation-section-link" href="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references#:~:text=To%20determine%20annual%20greenhouse%20gas,methane%20and%20nitrous%20oxide%20emissions">Carbon Emission Factor: 0.4 kilograms CO2 per mile</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of miles traveled this week in a gas car * 0.4 kilograms of CO2 produced per mile = # of kilograms of CO2 produced from a gas car in a week</p>
                        <p className="calculation-section-equation"># of kilograms of CO2 produced from a gas car in a week / 1,000 (conversion factor for kilograms to metric-tons) = # of metric tons of CO2 produced from a gas car in a week</p>
                    </div>

                    <p className="calculation-section-header">Hybrid Car</p>
                    <Link className="calculation-section-link" href="https://science.howstuffworks.com/science-vs-myth/everyday-myths/does-hybrid-car-production-waste-offset-hybrid-benefits.htm#:~:text=Hybrid%20Car%20Air%20Pollution%20Statistics,-Hybrid%20cars%20do&text=If%20every%20gallon%20of%20gasoline,74.9%20pounds%20(34%20kilograms)">Carbon Emission Factor: 0.231 kilograms of CO2 per mile</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of miles traveled this week in a hybrid car * 0.231 kilograms of CO2 produced per mile = # of kilograms of CO2 produced from a hybrid car in a week</p>
                        <p className="calculation-section-equation"># of kilograms of CO2 produced from a hybrid car in a week / 1,000 (conversion factor for kilograms to metric tons) = # of metric tons of CO2 produced from a hybrid car in a week</p>
                    </div>

                    <p className="calculation-section-header">Electric Car</p>
                    <p>Carbon Emission Factor: None</p>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation">Electric cars do not produce any carbon emissions</p>
                    </div>

                    <p className="calculation-section-header">Bus</p>
                    <Link className="calculation-section-link" href="https://www.escootersstores.com/blogs/sustainability/calculate-your-public-transport-carbon-footprint-ca?srsltid=AfmBOoqzA-khFgxQ4ILR1H2I_k4VzHTmF0rJF_o2qc2z2a3XyZ8a7W2t">Carbon Emission Factor: 0.089 kg of CO2 produced per passenger-mile</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of miles traveled by bus this week * 0.089 kg of CO2 produced per mile = # of kg of CO2 produced from a bus this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced from a bus this week / 1,000 (conversion factor from kg to metric tons) = # of metric-tons of CO2 produced from a bus this week</p>
                    </div>

                    <p className="calculation-section-header">Train</p>
                    <Link className="calculation-section-link" href="https://www.escootersstores.com/blogs/sustainability/calculate-your-public-transport-carbon-footprint-ca?srsltid=AfmBOoqzA-khFgxQ4ILR1H2I_k4VzHTmF0rJF_o2qc2z2a3XyZ8a7W2t">Carbon Emission Factor: 0.041 kg of CO2 produced per passenger-mile</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of miles traveled by train this week * 0.041 kg of CO2 produced per mile = # of kg of CO2 produced from a train this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced from a train this week / 1,000 (conversion factor from kg to metric tons) = # of metric-tons of CO2 produced from a train this week</p>
                    </div>

                    <p className="calculation-section-header">Metro/Subway System</p>
                    <Link className="calculation-section-link" href="https://www.escootersstores.com/blogs/sustainability/calculate-your-public-transport-carbon-footprint-ca?srsltid=AfmBOoqzA-khFgxQ4ILR1H2I_k4VzHTmF0rJF_o2qc2z2a3XyZ8a7W2t">Carbon Emission Factor: 0.053 kg of CO2 produced per passenger-mile</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of miles traveled by metro/subway system this week * 0.053 kg of CO2 produced per mile = # of kg of CO2 produced from a metro/subway system this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced from a metro/subway system this week / 1,000 (conversion factor from kg to metric tons = # of metric-tons of CO2 produced from a metro/subway system this week</p>
                    </div>

                    <p className="calculation-section-header">Airplane</p>
                    <Link className="calculation-section-link" href="https://andrewsteele.co.uk/climatechange/planetruth/numbers/">Carbon Emission Factor: 0.053 kg of CO2 produced per passenger-mile</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of miles traveled by airplane this week * 0.125 kg of CO2 produced per mile = # of kg of CO2 produced from an airplane this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced from an airplane this week / 1,000 (conversion factor from kg to metric tons = # of metric-tons of CO2 produced from an airplane this week</p>
                    </div>

                    <p className="calculation-section-header">Grains</p>
                    <Link className="calculation-section-link" href="https://ourworldindata.org/grapher/ghg-per-kg-poore?country=Tofu+%28soybeans%29~Barley~Maize~Oatmeal~Other+Pulses~Rice~Wheat+%26+Rye">Carbon Emission Factor: Barley - 1.18 kg, Maize - 1.7 kg, Oatmeal - 2.48 kg, Rice - 4.45 kg → 2.27 kg of CO2 produced per kg of grain products</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of grain products purchased this week * 2.27 kg of CO2 produced per kg of grain products = # of kg of CO2 produced for grain products this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for grain products this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from grain products this week</p>
                    </div>

                    <p className="calculation-section-header">Legumes</p>
                    <Link className="calculation-section-link" href="https://ourworldindata.org/grapher/ghg-per-kg-poore?country=Tofu+%28soybeans%29~Tofu~Other+Pulses~Peas">Carbon Emission Factor:  Tofu - 3.16 kg, Pulses - 1.79 kg, Peas - 0.98 kg → 1.9766666667 kg of CO2 produced per kg of legume products</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of legumes purchased this week * 1.9766666667 kg of CO2 produced per kg of legumes = # of kg of CO2 produced for legumes this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for legumes this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from legumes this week</p>
                    </div>

                    <p className="calculation-section-header">Fruit</p>
                    <Link className="calculation-section-link" href="https://ourworldindata.org/grapher/ghg-per-kg-poore?country=Tofu+%28soybeans%29~Tomatoes~Berries+%26+Grapes~Other+Fruit~Bananas~Apples~Citrus+Fruit">Carbon Emission Factor: Tomatoes - 2.09 kg, Berries & Grapes - 1.53 kg, Other Fruit - 1.05 kg, Bananas - 0.86 kg, Apples - 0.43 kg, Citrus Fruit - 0.39 kg → 1.05833333333 kg of CO2 produced per kg of fruit</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of fruit purchased this week * 1.05833333333 kg of CO2 produced per kg of fruit = # of kg of CO2 produced for fruit this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for fruit this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from fruit this week</p>
                    </div>

                    <p className="calculation-section-header">Vegetables</p>
                    <Link className="calculation-section-link" href="https://ourworldindata.org/grapher/ghg-per-kg-poore?country=Tofu+%28soybeans%29~Cassava~Other+Vegetables~Brassicas~Onions+%26+Leeks~Potatoes~Root+Vegetables">Carbon Emission Factor: Cassava - 1.32 kg, Other Vegetables - 0.53 kg, Brassicas - 0.51 kg, Onions & Leeks - 0.5 kg, Potatoes - 0.46 kg, Root Vegetables - 0.43 kg → 0.625 kg of CO2 produced per kg of vegetables</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of vegetables purchased this week * 0.625 kg of CO2 produced per kg of vegetables = # of kg of CO2 produced for vegetables this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for vegetables this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from vegetables this week</p>
                    </div>

                    <p className="calculation-section-header">Non-Dairy Milk</p>
                    <Link className="calculation-section-link" href="https://apps.carboncloud.com/climatehub/product-reports/id/385175632262">Carbon Emission Factor: Soy Milk - 0.98 kg, Almond Milk - 0.45 kg, Oat Milk - 0.44 kg → 0.6233333333 kg of CO2 produced per kg of non-dairy milk products</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of non-dairy milk products purchased this week * 0.6233333333 kg of CO2 produced per kg of non-dairy milk products = # of kg of CO2 produced for non-dairy milk products this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for non-dairy milk products this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from non-dairy milk products this week</p>
                    </div>

                    <p className="calculation-section-header">Dairy Products</p>
                    <Link className="calculation-section-link" href="https://ourworldindata.org/grapher/ghg-per-kg-poore?yScale=log&country=Tofu+%28soybeans%29~Cheese~Milk">Carbon Emission Factor: Cheese - 23.88 kg, Milk - 3.15 kg → 13.515 kg of CO2 produced per kg of dairy product</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of dairy products purchased this week * 13.515 kg of CO2 produced per kg of dairy products = # of kg of CO2 produced for dairy products this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for dairy products this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from dairy products this week</p>
                    </div>

                    <p className="calculation-section-header">Eggs</p>
                    <Link className="calculation-section-link" href="https://ourworldindata.org/grapher/ghg-per-kg-poore?yScale=log&country=Tofu+%28soybeans%29~Eggs">Carbon Emission Factor: 4.67 kg of CO2 produced per kg of eggs</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of eggs purchased this week * 4.67 kg of CO2 produced per kg of eggs = # of kg of CO2 produced for eggs this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for eggs this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from eggs this week</p>
                    </div>

                    <p className="calculation-section-header">Fish & Seafood</p>
                    <Link className="calculation-section-link" href="https://ourworldindata.org/grapher/ghg-per-kg-poore?yScale=log&country=Tofu+%28soybeans%29~Prawns+%28farmed%29~Fish+%28farmed%29">Carbon Emission Factor: Prawns - 26.87 kg, Fish - 13.63 kg → 20.25 kg of CO2 produced per kg of fish and seafood</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of fish and seafood purchased this week * 20.25 kg of CO2 produced per kg of fish and seafood = # of kg of CO2 produced for fish and seafood this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for fish and seafood this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from fish and seafood this week</p>
                    </div>

                    <p className="calculation-section-header">Meat Products</p>
                    <Link className="calculation-section-link" href="https://ourworldindata.org/grapher/ghg-per-kg-poore?yScale=log&country=Tofu+%28soybeans%29~Beef+%28beef+herd%29~Lamb+%26+Mutton~Pig+Meat~Poultry+Meat">Carbon Emission Factor: Beef - 99.48 kg, Lamb & Mutton - 39.72 kg, Pig Meat - 12.31 kg, Poultry Meat - 9.87 kg → 40.345 kg of CO2 produced per kg of meat products</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of meat products purchased this week * 40.345 kg of CO2 produced per kg of meat products = # of kg of CO2 produced for meat products this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for meat products this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from meat products this week</p>
                    </div>

                    <p className="calculation-section-header">Nuts</p>
                    <Link className="calculation-section-link" href="https://ourworldindata.org/grapher/ghg-per-kg-poore?yScale=log&country=Tofu+%28soybeans%29~Groundnuts~Nuts">Carbon Emission Factor: Groundnuts - 3.23 kg, Other Nuts - 0.43 kg → 1.83 kg of CO2 produced per kg of nuts purchased</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of nuts purchased this week * 1.83 kg of CO2 produced per kg of nuts = # of kg of CO2 produced for nuts this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for nuts this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from nuts this week</p>
                    </div>

                    <p className="calculation-section-header">Sugar & Chocolate</p>
                    <Link className="calculation-section-link" href="https://ourworldindata.org/grapher/ghg-per-kg-poore?yScale=log&country=Tofu+%28soybeans%29~Cane+Sugar~Dark+Chocolate">Carbon Emission Factor: Sugar - 3.2 kg, Chocolate - 46.65 kg → 24.925 kg of CO2 produced per kg of sugar and chocolate purchased</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of sugar and chocolate purchased this week * 24.925 kg of CO2 produced per kg of sugar and chocolate = # of kg of CO2 produced for sugar and chocolate this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for sugar and chocolate this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from sugar and chocolate this week</p>
                    </div>

                    <p className="calculation-section-header">Coffee</p>
                    <Link className="calculation-section-link" href="https://ourworldindata.org/grapher/ghg-per-kg-poore?yScale=log&country=Tofu+%28soybeans%29~Coffee">Carbon Emission Factor: 28.53 kg of CO2 produced per kg of coffee purchased</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of kg of coffee purchased this week * 28.53 kg of CO2 produced per kg of coffee = # of kg of CO2 produced for coffee this week</p>
                        <p className="calculation-section-equation"># of kg of CO2 produced for coffee this week / 1,000 (Conversion factor from kg to metric tons) = # of metric tons of CO2 produced from coffee this week</p>
                    </div>

                    <p className="calculation-section-header">Landfill</p>
                    <Link className="calculation-section-link" href="https://www.brightest.io/calculate-carbon-footprint-waste-emissions">Carbon Emission Factor: 3.5 kg of CO2 produced per kg of landfill</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of pounds of landfill generated this week * 0.453592 (conversion factor for pounds to kilograms) = # of kilograms of landfill generated this week</p>
                        <p className="calculation-section-equation"># of kilograms of landfill generated this week * 3.5 kg of CO2 produced per kg of landfill = # of kg of CO2 generated this week from landfill</p>
                        <p className="calculation-section-equation"># of kg of CO2 generated this week from landfill / 1,000 (conversion factor from kg to metric tons) = # of  metric tons of CO2 produced from landfill this week</p>
                    </div>

                    <p className="calculation-section-header">Clothing</p>
                    <Link className="calculation-section-link" href="https://www.openco2.net/en/search-emission-factors?q=clothing&sortBy=updatedYear&sortOrder=desc&page=1">Carbon Emission Factor: Leather - 46.90 kg, Wool - 24.80 kg, Cotton - 14.50 kg, Viscose/Rayon - 14 kg, Polyester - 12.70 kg, Linen - 11.70 kg, Nylon - 12.70 kg, Silk - 11.70 kg → 18.25 kg of CO2 produced per kg of clothing</Link>
                    <div className="calculation-section-equations">
                        <p className="calculation-section-equation"># of pounds of clothing purchased this week * 0.453592 (conversion factor for pounds to kilograms) = # of kilograms of clothing purchased this week</p>
                        <p className="calculation-section-equation"># of kilograms of clothing purchased this week * 18.25 kg of CO2 produced per kg of clothing = # of kg of CO2 generated this week from clothing</p>
                        <p className="calculation-section-equation"># of kg of CO2 generated this week from clothing / 1,000 (conversion factor from kg to metric tons) = # of  metric tons of CO2 produced from clothing this week</p>
                    </div>

                    <p className="calculation-result">Carbon Footprint → Add up all Carbon Emissions</p>
                </div>
            </Card>
        </div>
        </>
    )
}
