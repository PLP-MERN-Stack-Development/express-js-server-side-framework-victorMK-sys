// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const router = require('./routes');
const { eventLogger, auth, validation } = require('./middleware');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(express.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

const login = {
  admin: {
    login_id: '1010',
    login_name: "admin",
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  },
  user: 
  {
    login_id: '1222',
    login_name: "user",
    methods: ['GET']
  }
};

// Custom middleware to log request method, url, and timestamp
app.use('/', (req, res, next) => {
  auth(req);
  eventLogger(req);
  
  // check if the request body has an authorization key and pass it to the headers
  console.log(validation(req, login)[1]);
  
  // Call the next() function for the routes
  next();
});

// Routes(GET, POST, PUT, DELETE)
app.use('/api/products', router);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = {app, products};