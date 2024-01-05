const express = require('express');
const bodyParser = require('body-parser');
const knex = require("knex");
const knexfile = require('./db/knexfile.js');

// Database initialisatie
const db = knex(knexfile.development);

// Express app initialisatie
const app = express();
app.use(bodyParser.json());

// Importeer individuele routebestanden
const userRoutes = require('./routes/userRoutes.js');

// Gebruik de geïmporteerde routes
app.use(userRoutes);

// Importeer individuele routebestanden
const itemRoutes = require('./routes/itemsRoutes.js');

// Gebruik de geïmporteerde routes
app.use(itemRoutes);

// Importeer individuele routebestanden
const loansRoutes = require('./routes/loansRoutes.js');

// Gebruik de geïmporteerde routes
app.use(loansRoutes);


// Standaard welkomstroute
app.get('/', (req, res) => {
    res.send('Welcome to my project!');
});

// Algemene 404 route voor ongedefinieerde routes
app.use('*', (req, res) => {
    res.status(404).json({ message: 'This route does not exist' });
});

module.exports = app;
