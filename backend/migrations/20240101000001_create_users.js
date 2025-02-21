export const up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.enu('role', ['user', 'admin']).defaultTo('user');
      table.timestamps(true, true);
  });
};

export const down = function(knex) {
  return knex.schema.dropTable('users');
};