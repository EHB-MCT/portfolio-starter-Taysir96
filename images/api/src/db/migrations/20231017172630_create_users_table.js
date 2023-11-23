/**
 * Voert de migratie voor het aanmaken van de 'users'-tabel uit.
 * @param {import("knex").Knex} knex - Het Knex-object voor database-interactie.
 * @returns {Promise<void>} - Een Promise die wordt opgelost zodra de migratie is voltooid.
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email').unique(); // Maak de "email" kolom uniek
        table.string('password');
        table.string('userId').unique().notNullable();
        table.string('role');
    });
};

/**
 * Maakt de 'users'-tabel ongedaan door deze te verwijderen.
 * @param {import("knex").Knex} knex - Het Knex-object voor database-interactie.
 * @returns {Promise<void>} - Een Promise die wordt opgelost zodra de migratie is voltooid.
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
