/**
 * Executes the migration to create the 'users' table.
 * @param {import("knex").Knex} knex - The Knex object for database interaction.
 * @returns {Promise<void>} - A Promise resolved once the migration is complete.
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary(); // Incremental primary key
        table.string('first_name'); // First name of the user
        table.string('last_name'); // Last name of the user
        table.string('email').unique(); // Unique email address
        table.string('password'); // User password
        table.string('userId').unique().notNullable(); // Unique and non-nullable user ID
        table.string('role'); // Role of the user
    });
};

/**
 * Reverts the 'users' table creation by dropping it.
 * @param {import("knex").Knex} knex - The Knex object for database interaction.
 * @returns {Promise<void>} - A Promise resolved once the migration is complete.
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
