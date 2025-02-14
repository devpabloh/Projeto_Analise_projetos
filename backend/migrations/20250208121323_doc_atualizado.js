/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('doc_atualizado', function(table) {
      table.increments('id').primary();  // Identificador único para cada registro
      table.enu('status_documentacao', ['sim', 'nao', 'parcialmente']).notNullable();  // Campo que armazena o status da documentação
      table.timestamps(true, true);  // Campos de criação e atualização de dados
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('doc_atualizado');  // Remove a tabela se necessário
};
