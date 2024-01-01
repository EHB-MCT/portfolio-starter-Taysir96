const express = require('express');
const router = express.Router();
const db = require('../db/database.js');
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

/**
 * Endpoint to retrieve all items.
 */
router.get('/get-items', async (req, res) => {
    try {
        const items = await db('items');
        res.status(200).json({ items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the items' });
    }
});

/**
 * Endpoint to delete an item based on its ID.
 */
router.delete('/delete-item/:itemsId', async (req, res) => {
    try {
        const itemsId = req.params.itemsId;

        // Remove the item from the database based on itemsId
        const deletedItem = await db('items').where('itemsId', itemsId).del();

        if (deletedItem) {
            res.json({ message: 'Item has been deleted' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the item' });
    }
});

/**
 * Endpoint to update an item based on its ID.
 */
router.put('/update-item/:itemsId', async (req, res) => {
    try {
        const itemsId = req.params.itemsId;
        const { name, description, is_available, img_link } = req.body;

        // Update the item in the database based on itemsId
        const updatedItem = await db('items')
            .where('itemsId', itemsId)
            .update({ name, description, is_available, img_link });

        if (updatedItem) {
            res.json({ message: 'Item has been updated' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the item' });
    }
});

module.exports = router;
