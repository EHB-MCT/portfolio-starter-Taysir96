exports.up = function (knex) {
    return knex.schema.createTable('loans', function (table) {
        table.increments('id').primary();
        table.string('loanId').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
        table.text('description');
        table.string('userId').unsigned().references('id').inTable('users');
        table.string('itemsId').unsigned().references('id').inTable('items');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('loans');
};
