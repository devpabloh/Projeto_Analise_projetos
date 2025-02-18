/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tecnologias_banco_de_dados', function(table) {
      table.increments('id').primary();
      table.string('nome_banco_de_dados').notNullable();
      table.string('descricao');
      table.integer('projeto_id').unsigned().references('id').inTable('informacoes_gerais').onDelete('CASCADE');
      table.timestamps(true, true);
  });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTable('tecnologias_banco_de_dados');
};