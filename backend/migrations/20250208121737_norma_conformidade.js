/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('norma_conformidade', function(table) {
      table.increments('id').primary();
      table.text('medidas_seguranca').notNullable();
      table.text('normas').notNullable();
      table.integer('projeto_id').unsigned().references('id').inTable('informacoes_gerais').onDelete('CASCADE');
      table.timestamps(true, true);
  });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTable('norma_conformidade');
};