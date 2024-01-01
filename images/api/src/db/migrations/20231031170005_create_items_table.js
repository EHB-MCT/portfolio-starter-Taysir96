/**
 * Executes the migration to create the 'items' table.
 * @param {import("knex").Knex} knex - The Knex object for database interaction.
 * @returns {Promise<void>} - A Promise resolved once the migration is complete.
 */
exports.up = function (knex) {
    return knex.schema.createTable('items', function (table) {
        table.increments('id').primary(); // Automatically generated numeric ID
        table.string('itemsId').unique().notNullable(); // Custom itemsId, unique and not nullable
        table.string('name').notNullable(); // Name of the item, not nullable
        table.text('description'); // Description of the item
        table.boolean('is_available').defaultTo(true); // Boolean indicating availability, defaults to true
        table.string('img_link'); // Column for the image URL
    });
};

/**
 * Reverts the 'items' table creation by dropping it.
 * @param {import("knex").Knex} knex - The Knex object for database interaction.
 * @returns {Promise<void>} - A Promise resolved once the migration is complete.
 */
exports.down = function (knex) {
    return knex.schema.dropTable('items');
};
