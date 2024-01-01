    const express = require('express');
    const router = express.Router();
    const db = require('../db/database.js');
    const { v4: uuidv4 } = require('uuid');

    /**
     * Controleert of een e-mailadres al bestaat in de database.
     * @param {string} email - Het e-mailadres dat gecontroleerd moet worden.
     * @returns {Promise<boolean>} - Een Promise die waar is als het e-mailadres al bestaat, anders is het onwaar.
     */
    const doesEmailExist = async (email) => {
        const existingUser = await db('users').where({ email }).first();
        return existingUser !== undefined;
    };

    /**
     * Controleert of een wachtwoord aan de vereisten voldoet (minimaal 6 tekens en minimaal één cijfer).
     * @param {string} password - Het wachtwoord dat gecontroleerd moet worden.
     * @returns {boolean} - True als het wachtwoord aan de vereisten voldoet, anders is het onwaar.
     */
    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
        return passwordRegex.test(password);
    };

    /**
     * Endpoint voor het registreren van een nieuwe gebruiker.
     */
    router.post('/register', async (req, res) => {
        try {
            const { first_name, last_name, email, password, userId, role } = req.body;  // Verkrijg gebruikersgegevens van het verzoek

            // Controleer of het e-mailadres al bestaat in de database
            const emailExists = await doesEmailExist(email);
            if (emailExists) {
                return res.status(400).json({ message: 'Dit e-mailadres is al geregistreerd.' });
            }

            // Controleer of het wachtwoord aan de vereisten voldoet
            if (!isPasswordValid(password)) {
                return res.status(400).json({ message: 'Wachtwoord moet minimaal 6 tekens lang zijn en minstens één cijfer bevatten.' });
            }

            // Genereer een nieuwe UUID voor de gebruiker
            const user_id = uuidv4();

            // Voeg de gebruiker toe aan de database met de gegenereerde UUID
            const [user] = await db('users').insert({ first_name, last_name, email, password, userId: user_id, role }).returning('*');

            res.status(201).json({ message: 'Gebruiker is aangemaakt', user: { first_name, last_name, email, userId: user_id, role } });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Er is een fout opgetreden tijdens de registratie' });
        }
    });

    /**
     * Endpoint voor het inloggen van een gebruiker.
     */
    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;  // Verkrijg gebruikersgegevens van het verzoek

            // Controleer of het e-mailadres al bestaat in de database
            const existingUser = await db('users').where({ email }).first();
            if (!existingUser) {
                return res.status(400).json({ message: 'E-mailadres of wachtwoord is onjuist.' });
            }

            // Controleer of het wachtwoord overeenkomt met het wachtwoord in de database
            if (password !== existingUser.password) {
                return res.status(400).json({ message: 'E-mailadres of wachtwoord is onjuist.' });
            }

            res.status(200).json({ message: 'Gebruiker is ingelogd', user: existingUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Er is een fout opgetreden tijdens het inloggen' });
        }
    });

    module.exports = router;
