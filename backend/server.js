const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/UserRoutes');
const sellerRoutes = require('./routes/SellerRoutes');
const cors = require('cors');  // Import CORS middleware

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'https://my-talor-zone-by-sahiba-9w49.vercel.app',  // Add your frontend URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));

app.use(express.json()); // Middleware to parse JSON request body

// Routes
app.use('/api/users', userRoutes);
app.use('/api/seller', sellerRoutes);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from Vercel!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
