// const express = require('express');
// const cors = require('cors'); // Add CORS if needed
// const app = express();
// const connectDB = require('./config/db');
// const authRouter = require('./routes/authRoutes'); // Import the auth router

// const corsOptions = {
//   origin: 'https://azamshaik7.github.io',  // Update with your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));

// // Middleware setup

// app.use(express.json()); // Make sure to use JSON parser

// // Use the auth router for '/api/auth' prefix
// app.use('/api/auth', authRouter);

// // Connect to database
// connectDB();

// // Start the server
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });



// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://azamshaik7.github.io', // Update with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply middleware
app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // Parse JSON request bodies

// Define routes
app.use('/api/auth', authRouter);

// Connect to the database
connectDB()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit process with failure
  });

// Define a health check route
app.get('/', (req, res) => {
  res.status(200).send('Server is running. Welcome to the Physiotherapy API.');
});

// Handle invalid routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

