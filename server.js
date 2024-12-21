const express = require('express');
const cors = require('cors'); // Add CORS if needed
const app = express();
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes'); // Import the auth router

const corsOptions = {
  origin: 'https://azamshaik7.github.io',  // Update with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middleware setup

app.use(express.json()); // Make sure to use JSON parser

// Use the auth router for '/api/auth' prefix
app.use('/api/auth', authRouter);

// Connect to database
connectDB();

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
