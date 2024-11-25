// MongoDB connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:ZsC4Nlym4cJ8Fvxh@carbonfootprintcluster.hpvhu.mongodb.net/";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
run().catch(console.dir);

// Backend server
const express = require('express');
// CORS to communicate between port 3000 and port 5000
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
    const{ username, email, password } = req.body;

    try {
        const database = client.db('ecoquest');
        const usersCollection = database.collection('userdata');

        const result = await usersCollection.insertOne({ username, email, password });

        res.status(201).json({ message: 'User sign up successful', userId: result.insertedId })
        console.log('User sign up successful');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Failed to sign up user' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const{ email, password } = req.body;

    try {
        const database = client.db('ecoquest');
        const user = await database.collection('userdata').findOne( {email} );

        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            if (password == user.password) {
                res.status(201).json({ message: 'User log in successful', userId: user._id })

                // Create session
                const userSessionsCollection = database.collection('usersessions');
                const clearSession = await userSessionsCollection.deleteOne({});
                const session = await userSessionsCollection.insertOne({ 
                    username: user.username, 
                    email: user.email 
                });

            }
            else {
                res.status(401).json({ message: "Incorrect password" });
            }
        }

    } catch (error) {
        console.error('Error verifying user info:', error);
        res.status(500).json({ message: 'Failed to log in user' });
    }
});

// Store footprint calculation endpoint
app.post('/storefootprint', async (req, res) => {
    const { footprintCalculated, waterVal, gasVal, electricityVal,
        grainsVal, legumesVal, fruitVal,
        vegetablesVal, nonDairyMilkVal, dairyVal,
        eggsVal, seafoodVal, meatVal, nutsVal,
        sugarVal, coffeeVal, wasteVal, clothingVal,
        gasolineCarVal, hybridCarVal, electricCarVal,
        busPubTransVal, trainPubTransVal, 
        metroPubTransVal, airplanePubTransVal, timestamp } = req.body;

    try {
        const database = client.db('ecoquest');
        const user = await database.collection('usersessions').findOne();
        
        const userFootprintsCollection = await database.collection('userfootprints');

        const storeFootprint = await userFootprintsCollection.insertOne({
            user: user.username,
            footprint: footprintCalculated,
            waterUsage: waterVal,
            gasUsage: gasVal,
            electricityUsage: electricityVal,
            grainConsumption: grainsVal,
            legumeConsumption: legumesVal,
            fruitConsumption: fruitVal,
            vegetableConsumption: vegetablesVal,
            nonDairyMilkConsumption: nonDairyMilkVal,
            dairyConsumption: dairyVal,
            eggConsumption: eggsVal,
            seafoodConsumption: seafoodVal,
            meatConsumption: meatVal,
            nutConsumption: nutsVal,
            sugarConsumption: sugarVal,
            coffeeConsumption: coffeeVal,
            wasteProduction: wasteVal,
            clothingPurchased: clothingVal,
            gasolineCarUsage: gasolineCarVal,
            hybridCarUsage: hybridCarVal,
            electricCarUsage: electricCarVal,
            busUsage: busPubTransVal,
            trainUsage: trainPubTransVal,
            metroUsage: metroPubTransVal,
            airplaneUsage: airplanePubTransVal,
            timestamp: timestamp
        });

        res.status(201).json({ message: 'Footprint stored successfully' });
    
    
    } catch (error) {
        console.error('Error storing footprint data:', error);
        res.status(500).json({ message: 'Failed to store footprint data' });
    }

});

// Populate profile page
app.post('/profile', async (req, res) => {

    try {
        const database = client.db('ecoquest');
        const user = await database.collection('usersessions').findOne();
        const footprintData = await database.collection('userfootprints').findOne( {user : user.username} )

        if (user && footprintData) {
            res.status(200).json({
                message: "User and footprint info fetched successfully",
                user: user.username,
                footprint: footprintData.footprint
            })
        }
        else if (user) {
            res.status(200).json({
                message: "User fetched successfully, no footprint info found",
                user: user.username,
                footprint: null
            })
        }

    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ message: 'Failed to fetch user info' });
    }

});

// Leaderboard endpoint
app.get("/leaderboard", async (req, res) => {
    try {
      const database = client.db("ecoquest");
      const userFootprintsCollection = database.collection("userfootprints");
      // Fetch and sort by footprint in descending order
      const leaderboard = await userFootprintsCollection
        .find()
        .sort({ footprint: 1 })
        .limit(10)
        .toArray();
      res.status(200).json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ message: "Failed to fetch leaderboard data" });
    }
  });

// Close server when app shuts down
process.on('SIGINT', async () => {
    // Terminate session
    const database = client.db('ecoquest');
    const session = await database.collection('usersession').deleteMany({});

    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
})

// Server start
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});