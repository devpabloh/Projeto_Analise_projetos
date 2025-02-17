/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('medidas_seguranca', function(table) {
    table.increments('id').primary();
    table.enu('foi_implementado', ['sim', 'nao']).notNullable().defaultTo('nao');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('medidas_seguranca');
};
