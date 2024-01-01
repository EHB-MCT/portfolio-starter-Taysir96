/**
 * Executes the migration to create the 'loans' table.
 * @param {import("knex").Knex} knex - The Knex object for database interaction.
 * @returns {Promise<void>} - A Promise resolved once the migration is complete.
 */
exports.up = function (knex) {
    return knex.schema.createTable('loans', function (table) {
        table.increments('id').primary(); // Incremental primary key
        table.string('loanId').notNullable(); // Unique loan ID, not nullable
        table.date('start_date').notNullable(); // Start date of the loan, not nullable
        table.date('end_date').notNullable(); // End date of the loan, not nullable
        table.text('description'); // Description of the loan
        table.string('userId').unsigned().references('id').inTable('users'); // Foreign key referencing 'users'
        table.string('itemsId').unsigned().references('id').inTable('items'); // Foreign key referencing 'items'
    });
};

/**
 * Reverts the 'loans' table creation by dropping it.
 * @param {import("knex").Knex} knex - The Knex object for database interaction.
 * @returns {Promise<void>} - A Promise resolved once the migration is complete.
 */
exports.down = function (knex) {
    return knex.schema.dropTable('loans');
};
