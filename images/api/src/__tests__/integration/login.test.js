const request = require('supertest');
const app = require('./../../app.js');
const db = require('./../../db/database.js');
describe('POST /login', () => {
    beforeAll(async () => {
        // Voer eventuele voorbereidende stappen uit, zoals het maken van een testgebruiker in de database
        const testUser = {
            email: 'test@example.com',
            password: 'TestPassword',
        };

        await db('users').insert(testUser);
    });

    afterAll(async () => {
        // Voer eventuele opruimstappen uit, zoals het verwijderen van testgebruikers of het terugdraaien van database-wijzigingen
        await db('users').where({ email: 'test@example.com' }).del();
    });

    it('should log in a user with valid credentials', async () => {
        const credentials = {
            email: 'test@example.com',
            password: 'TestPassword'
        };

        const response = await request(app)
            .post('/login')
            .send(credentials);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Gebruiker is ingelogd');
        expect(response.body.user).toHaveProperty('email', 'test@example.com');
    });

    it('should return an error for invalid credentials', async () => {
        const invalidCredentials = {
            email: 'test@example.com',
            password: 'IncorrectPassword'
        };

        const response = await request(app)
            .post('/login')
            .send(invalidCredentials);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'E-mailadres of wachtwoord is onjuist.');
    });
});
