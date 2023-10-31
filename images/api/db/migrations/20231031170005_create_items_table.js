/**
 * @param { import("knex").Knex } knex - The Knex object for database interaction.
 * @returns { Promise<void> } - A Promise that resolves once the migration is complete.
 */
exports.up = function (knex) {
    return knex.schema.createTable('items', function (table) {
        table.increments('id').primary(); // Automatically generated numeric ID
        table.string('itemsId').notNullable(); // Custom itemsId
        table.string('name').notNullable();
        table.text('description');
        table.boolean('is_available').defaultTo(true); // Boolean column, default set to true (available)
        table.string('img_link'); // Kolom voor de afbeeldings-URL
    });
};

/**
 * @param { import("knex").Knex } knex - The Knex object for database interaction.
 * @returns { Promise<void> } - A Promise that resolves once the migration is complete.
 */
exports.down = function (knex) {
    return knex.schema.dropTable('items');
};
