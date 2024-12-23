const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/UserRoutes');
const sellerRoutes = require('./routes/SellerRoutes')

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// Routes
app.use('/api/users', userRoutes);
app.use('/api/seller', sellerRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
