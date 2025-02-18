/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('implementacao_projeto', function(table) {
      table.increments('id').primary();
      table.string('implementado').notNullable();
      table.string('ambiente').notNullable();
      table.integer('projeto_id').unsigned().references('id').inTable('informacoes_gerais').onDelete('CASCADE');
      table.timestamps(true, true);
  });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTable('implementacao_projeto');
};