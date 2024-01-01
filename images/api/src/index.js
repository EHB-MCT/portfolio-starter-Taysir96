// Import the express module to create a web server
const express = require('express');
const app = express();

// Define the port on which the server should listen, with a fallback to port 3000 if the environment variable is not set
const port = process.env.PORT || 3000;

// Import the database connection
const db = require('./db/database.js');

// Use JSON middleware to handle JSON requests
app.use(express.json());

// Import the user routes
const userRoutes = require('./routes/userRoutes');

// Use the user routes in the application
app.use(userRoutes);

// Import the items routes
const itemsRoutes = require('./routes/itemsRoutes');

// Use the items routes in the application
app.use(itemsRoutes);

// Import the loans routes
const loansRoutes = require('./routes/loansRoutes');

// Use the loans routes in the application
app.use(loansRoutes);

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Welcome to my project!');
});

// Define a route for handling unknown routes
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'This route does not exist',
    });
});

// Start the server and listen on the specified port
app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is listening on port ${port}`);
    } else {
        console.error(err);
    }
});
