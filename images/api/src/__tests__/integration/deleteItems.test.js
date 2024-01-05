const request = require('supertest');
const app = require('./../../app.js');
const db = require('./../../db/database.js');
const { v4: uuidv4 } = require('uuid');

describe('DELETE /delete-item/:itemsId', () => {
    it('should delete an item and return a success message', async () => {
        // Generate a new UUID for the item
        const itemId = uuidv4();

        // Insert the item into the database
        await db('items').insert({
            itemsId: itemId,
            name: 'Item to Delete',
            description: 'Description',
            is_available: true,
            img_link: 'http://example.com/image.png'
        });

        // Send DELETE request
        const response = await request(app).delete(`/delete-item/${itemId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Item has been deleted');

        // Verify item deletion in the database
        const deletedItem = await db('items').where('itemsId', itemId).first();
        expect(deletedItem).toBeFalsy();
    });

    // More tests for error cases...

    it('should return an error if the item does not exist', async () => {
        // Send DELETE request
        const response = await request(app).delete(`/delete-item/123`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Item not found');
    });
});


