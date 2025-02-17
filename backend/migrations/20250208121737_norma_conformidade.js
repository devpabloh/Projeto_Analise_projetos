// Migration para criar a tabela norma_conformidade
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('norma_conformidade', function(table) {
    table.increments('id').primary();
    // Armazena se o projeto atende alguma norma de conformidade: 'sim' ou 'nao'
    table.enu('atende_norma', ['sim', 'nao']).notNullable();
    // Caso atenda, armazena os tipos de normas selecionadas como um array de textos
    table.specificType('quais_normas', 'text[]');
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
  
