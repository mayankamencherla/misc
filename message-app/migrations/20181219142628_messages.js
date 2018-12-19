/**
 * Messges schema for knex
 */

exports.up = function(knex, Promise) {

    return knex.schema.createTable('messages', (t) => {

        t.string('id').primary();

        t.string('message').notNullable();

        t.string('digest').notNullable();

        t.timestamps(false, true);

        t.unique('digest');

        t.index('digest');
    });
};

exports.down = function(knex, Promise) {

    return knex.schema.dropTableIfExists('messages');
};
