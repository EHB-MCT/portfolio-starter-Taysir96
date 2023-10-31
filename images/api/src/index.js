// Importeer de express-module voor het maken van een webserver
const express = require('express');
const app = express();

// Definieer de poort waarop de server moet luisteren, met een fallback naar poort 3000 als de omgevingsvariabele niet is ingesteld
const port = process.env.PORT || 3000;

// Importeer de databaseverbinding
const db = require('../db/database.js');

// Gebruik JSON-middleware om JSON-verzoeken te verwerken
app.use(express.json());

// Importeer de gebruikersroutes
const userRoutes = require('./routes/userRoutes');

// Gebruik de gebruikersroutes in de applicatie
app.use(userRoutes);

// Definieer een route voor de hoofdpagina
app.get('/', (req, res) => {
    res.send('Welkom bij mijn project!');
});

// Definieer een route voor het afhandelen van onbekende routes
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Deze route bestaat niet',
    });
});


// Start de server en luister naar de opgegeven poort
app.listen(port, (err) => {
    if (!err) {
        console.log(`De server luistert op poort ${port}`);
    } else {
        console.error(err);
    }
});
