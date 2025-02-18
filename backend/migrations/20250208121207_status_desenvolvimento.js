/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('status_desenvolvimento', function(table) {
      table.increments('id').primary();
      table.date('data_inicial').notNullable();
      table.date('data_final').notNullable();
      table.enu('status', ['inicio', 'desenvolvimento', 'testes', 'homologacao', 'producao', 'encerrado']).notNullable();
      table.integer('projeto_id').unsigned().references('id').inTable('informacoes_gerais').onDelete('CASCADE');
      table.timestamps(true, true);
  });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTable('status_desenvolvimento');
};