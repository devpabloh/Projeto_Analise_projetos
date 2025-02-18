/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('testes_qualidade', function(table) {
      table.increments('id').primary();
      table.string('passou_por_testes').notNullable(); // Mudado de boolean para string
      table.string('tipos_testes');
      table.integer('projeto_id').unsigned().references('id').inTable('informacoes_gerais').onDelete('CASCADE');
      table.timestamps(true, true);
  });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTable('testes_qualidade');
};