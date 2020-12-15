
exports.up = function(knex) {
  return knex.schema.createTable('pets', (table) => {
    table.increments('id').primary();
    table.string('species', 20).notNullable();
    table.string('name', 32).notNullable();
    table.integer('age').notNullable();
    table.string('description');
    table.foreign('user_id').references('users.id');
  });
};

exports.down = function(knex) {
  
};
