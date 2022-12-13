const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const shopCollection = client.db('chairish').collection('shopProducts');
        const addProductsCollection = client.db('chairish').collection('addedProducts');


        //getting data for featured section
        app.get('/featured', async (req, res) => {
            const query = {};
            const result = await featuredCollection.find(query).toArray();
            res.send(result);
        })

        // api endpoints for shop section
        // getting api
        app.get('/shopProducts', async (req, res) => {
            const query = {};
            const result = await shopCollection.find(query).toArray();
            res.send(result);
        })
        // get limited data for shop page
        app.get('/shop2', async (req, res) => {
            const query = {};
            const result = await shopCollection.find(query).limit(2).toArray();
            res.send(result)
        })
        // get specific products by id
        app.get('/shop/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await shopCollection.findOne(query);
            res.send(result);
        })
        // post shop products to add products collection in data base
        app.post('/addProducts', async (req, res) => {
            const body = req.body;
            const result = await addProductsCollection.insertOne(body);
            res.send(result)
        })
        //getting data for cart page
        app.get('/cart/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await addProductsCollection.findOne(query);
            res.send(result);
        })
        //getting data for navbar cart
        app.get('/viewCart', async (req, res) => {
            const query = {};
            const result = await addProductsCollection.find(query).toArray();
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