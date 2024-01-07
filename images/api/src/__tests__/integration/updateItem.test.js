const request = require('supertest');
const app = require('./../../app.js');
const db = require('./../../db/database.js');
const { v4: uuidv4 } = require('uuid');

/**
 * Test suite for the PUT /update-item/:itemsId endpoint.
 */

describe('PUT /update-item/:itemsId', () => {
    it('should update an item and return a success message', async () => {
        // Generate a new UUID for the item and insert it into the database
        const itemId = uuidv4();
        await db('items').insert({
            itemsId: itemId,
            name: 'Original Name',
            description: 'Original Description',
            is_available: true,
            img_link: 'http://example.com/original.png'
        });

        // Define the data for updating the item
        const updatedData = {
            name: 'Updated Name',
            description: 'Updated Description',
            is_available: false,
            img_link: 'http://example.com/updated.png'
        };

        // Send PUT request
        const response = await request(app).put(`/update-item/${itemId}`).send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Item has been updated');

        // Verify item update in the database
        const updatedItem = await db('items').where('itemsId', itemId).first();
        expect(updatedItem).toMatchObject(updatedData);
    });

    /**
        * Test case: Updating a non-existent item should return a 404 error.
        */
    it('should return an error if the item does not exist', async () => {
        // Define the data for updating the item
        const updatedData = {
            name: 'Updated Name',
            description: 'Updated Description',
            is_available: false,
            img_link: 'http://example.com/updated.png'
        };

        // Send PUT request
        const response = await request(app).put(`/update-item/123`).send(updatedData);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Item not found');
    });
});
