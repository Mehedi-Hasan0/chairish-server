const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

// middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.69zqaep.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const featuredCollection = client.db('chairish').collection('featured');

        //getting data for featured section
        app.get('/featured', async (req, res) => {
            const query = {};
            const result = await featuredCollection.find(query).toArray();
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Chairish server is running')
})

app.listen(port, () => {
    console.log(`Chairish server is running on port, ${port}`);
})