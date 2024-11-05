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

// Close server when app shuts down
process.on('SIGINT', async () => {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
})

// Server start
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});