// server.js
const express = require('express');
const app = express();
const path = require('path');
const { MongoClient } = require('mongodb');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parse JSON bodies

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'feedbackDB';
const collectionName = 'feedback';

// Define a route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route to handle form submission and save data to MongoDB
app.post('/submit', async (req, res) => {
    try {
        const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const feedback = req.body;
        const result = await collection.insertOne(feedback);
        console.log('Feedback saved:', result.ops[0]);
        client.close();
        res.status(200).send('Feedback submitted successfully!');
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).send('Error submitting feedback.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
