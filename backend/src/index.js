import dotenv from 'dotenv';
dotenv.config();

const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all origins (or specific origins)
app.use(cors({
    origin: 'http://localhost:3000/', // Replace with your frontend URL if needed
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
}));
app.use(cors());
app.use(express.json());

// Your routes go here
require('./app');  // Your route file

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
