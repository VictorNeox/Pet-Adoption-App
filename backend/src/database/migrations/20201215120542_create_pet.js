
exports.up = function(knex) {
    return knex.schema.createTable('pets', (table) => {
      table.increments('id').primary();
      table.string('species', 20).notNullable();
      table.string('gender').notNullable();
      table.string('name', 32).notNullable();
      table.integer('age').notNullable();
      table.string('description');
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('pets');
  };
  