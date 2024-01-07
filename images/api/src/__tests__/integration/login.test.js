const request = require('supertest');
const app = require('./../../app.js');
const db = require('./../../db/database.js');

/**
 * Test suite for the POST /login endpoint.
 */

describe('POST /login', () => {
    /**
       * Test suite for the POST /login endpoint.
    */
    beforeAll(async () => {
        const testUser = {
            userId: 'some-unique-id', // Add a unique userId value
            email: 'test@example.com',
            password: 'TestPassword',
        };

        await db('users').insert(testUser);
    });

    /**
     * Cleanup after running tests.
     * Remove the test user from the database.
   */

    afterAll(async () => {
        // Voer eventuele opruimstappen uit, zoals het verwijderen van testgebruikers of het terugdraaien van database-wijzigingen
        await db('users').where({ email: 'test@example.com' }).del();
    });

    /**
       * Test case: Logging in with valid credentials should succeed.
       */

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

    /**
    * Test case: Logging in with invalid credentials should return an error.
    */

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
