
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('login', 16).notNullable().unique();
      table.string('password').notNullable();
      table.string('email').notNullable().unique();
      table.string('phone', 11);
      table.string('city', 100).notNullable();
      table.string('uf', 2).notNullable();
      table.string('profilepic');
      table.string('latitude');
      table.string('longitude');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
