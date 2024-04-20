const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const cors= require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()


const port = 3000
app.use(bodyParser.json())
app.use(cors())
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Passop';

client.connect();

// Get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('password');

    const findResult = await collection.find({}).toArray();

    res.json(findResult)
})
// Save a password
app.post('/', async (req, res) => {
    const passwords = req.body
    const db = client.db(dbName);
    const collection = db.collection('password');

    // const findResult = await collection.find({}).toArray();

    const insertResult = await collection.insertOne(passwords);

    res.send({success:true,result:insertResult} )
})
// Delete password by id
app.delete('/', async (req, res) => {
    const passwords = req.body
    const db = client.db(dbName);
    const collection = db.collection('password');

    // const findResult = await collection.find({}).toArray();

    const deleteResult = await collection.deleteOne(passwords);

    res.send({success:true,result:deleteResult} )
}) 
app.put('/api/passwords/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
  
      // Find password by ID and update
      const updatedPassword = await password.findByIdAndUpdate(id, { password }, { new: true });
  
      if (!updatedPassword) {
        return res.status(404).json({ message: 'Password not found' });
      }
  
      res.json(updatedPassword);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

app.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
})