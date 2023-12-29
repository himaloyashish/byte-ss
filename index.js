require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.Port || 5000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6ogtg9l.mongodb.net/?retryWrites=true&w=majority`;

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
        // Send a ping to confirm a successful connectionj

     
        const byteDbCollection = client.db("byteNet").collection("device");


        // byte net multi device 

        app.get('/device/:text', async (req, res)=>{

            if(req.params.text === "television" || req.params.text === "laptop" || req.params.text === "camera"){
                const result = await byteDbCollection.find({category: req.params.text}).toArray()
              return res.send(result)

            }

            const result = await byteDbCollection.find({}).toArray();
            return res.send(result);

        })






        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);










app.get('/', (req, res) => {
    res.send("The mobile door app is on mood")
})

app.listen(port, () => {
    console.log(`The mobile door app is running on port ${port}`);
})