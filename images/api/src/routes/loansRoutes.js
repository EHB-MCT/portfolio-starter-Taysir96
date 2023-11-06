const express = require('express');
const router = express.Router();
const db = require('../../db/database.js');
const { v4: uuidv4 } = require('uuid');

/**
 * Endpoint to create a new loan.
 */
router.post('/create-loan', async (req, res) => {
    try {
        const { loanId, start_date, end_date, description, userId, itemsId } = req.body;

        // Generate a new UUID for the loan
        const loan_id = uuidv4();

        // Add the loan to the database
        await db('loans').insert({ loanId: loan_id, start_date, end_date, description, userId, itemsId });

        res.status(201).json({ message: 'Loan has been created', loan_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the loan' });
    }
});

/**
 * Endpoint to retrieve all loans with associated users and items.
 */
router.get('/get-loans', async (req, res) => {
    try {
        const loans = await db('loans')
            .select('loans.*', 'users.email as email', 'items.name as item_name')
            .join('users', 'loans.userId', 'users.id')
            .join('items', 'loans.itemsId', 'items.id');
        res.status(200).json(loans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the loans' });
    }
});

/**
 * Endpoint to retrieve a loan based on the loan ID. If the loan does not exist, return a message.
 */
router.get('/get-loan', async (req, res) => {
    try {
        const loanId = req.query.loanId; // No need for destructuring
        const loan = await db('loans')
            .select('loans.*', 'users.email as email', 'items.name as item_name')
            .join('users', 'loans.userId', 'users.id')
            .join('items', 'loans.itemsId', 'items.id')
            .where('loans.id', loanId);
        if (loan.length === 0) {
            res.status(404).json({ message: 'Loan not found' });
        } else {
            res.status(200).json(loan);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the loan' });
    }
});

/**
 * Endpoint to delete a loan based on the loan ID. If the loan does not exist, return a message.
 */
router.delete('/delete-loan', async (req, res) => {
    try {
        const loanId = req.query.loanId; // No need for destructuring
        const loan = await db('loans').where('id', loanId);
        if (loan.length === 0) {
            res.status(404).json({ message: 'Loan not found' });
        } else {
            await db('loans').where('id', loanId).del();
            res.status(200).json({ message: 'Loan has been deleted' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the loan' });
    }
});

/**
 * Endpoint to update a loan based on the loan ID. If the loan does not exist, return a message.
 */
router.put('/update-loan', async (req, res) => {
    try {
        const loanId = req.query.loanId; // No need for destructuring
        const loan = await db('loans').where('id', loanId);
        if (loan.length === 0) {
            res.status(404).json({ message: 'Loan not found' });
        } else {
            await db('loans').where('id', loanId).update(req.body);
            res.status(200).json({ message: 'Loan has been updated' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the loan' });
    }
});

module.exports = router;
