/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('doc_atualizado', function(table) {
      table.increments('id').primary();
      table.boolean('possui_documentacao').notNullable();
      table.string('tipos_documentos');
      table.text('outros_documentos');
      table.boolean('documentacao_atualizada').notNullable();
      table.integer('projeto_id').unsigned().references('id').inTable('informacoes_gerais').onDelete('CASCADE');
      table.timestamps(true, true);
  });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTable('doc_atualizado');
};