const express = require('express');
const router = express.Router();
const db = require('../../db/database.js');
const { v4: uuidv4 } = require('uuid');

/**
 * Endpoint to create a new item.
 */
router.post('/create-item', async (req, res) => {
    try {
        const { itemsId, name, description, is_available, img_link } = req.body;

        // Check if an item with the same name already exists
        const existingItem = await db('items').where('name', name).first();
        if (existingItem) {
            return res.status(400).json({ message: 'An item with the same name already exists.' });
        }

        // Generate a new UUID for the item
        const itemId = uuidv4();

        // Add the item to the database, including the img_link
        await db('items').insert({ itemsId: itemId, name, description, is_available, img_link });

        res.status(201).json({ message: 'Item has been created', itemId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the item' });
    }
});

module.exports = router;
