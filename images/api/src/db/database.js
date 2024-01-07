// Importeer de knex-module voor database-interactie
const knex = require('knex');

// Importeer de knex-configuratie uit het knexfile
const knexfile = require('./knexfile.js');

// Maak een databaseverbinding met behulp van knex en de ontwikkelingsconfiguratie
const db = knex(knexfile.development);

// Exporteer de databaseverbinding om deze in andere delen van de applicatie te gebruiken
module.exports = db;
