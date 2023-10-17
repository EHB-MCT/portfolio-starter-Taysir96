// Importeer de express-module voor het maken van een webserver
const express = require('express');
const app = express();

// Definieer de poort waarop de server moet luisteren
const port = process.env.PORT || 3000;

// Importeer de knex-module voor database-interactie
const knex = require('knex');
const knexConfig = require('../knexfile'); // Zorg ervoor dat het juiste pad wordt opgegeven

// Maak een databaseverbinding met behulp van knex
const db = knex(knexConfig.development);

// Voer een eenvoudige query uit om te controleren of de databaseverbinding werkt
db.raw("SELECT 1=1").then((result) => {
    console.log(result);
});

// Definieer een route voor de hoofdpagina
app.get('/', (req, res) => {
    res.send('Welkom bij mijn project!');
});

// Start de server en luister naar de opgegeven poort
app.listen(port, (err) => {
    if (!err) {
        console.log(`De server luistert op poort ${port}`);
    } else {
        console.error(err);
    }
});
