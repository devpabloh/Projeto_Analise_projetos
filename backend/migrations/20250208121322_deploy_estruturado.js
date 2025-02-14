/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('deploy_estruturado', function(table) {
      table.increments('id').primary();  // Identificador único para cada registro
      table.enu('processo_deploy', ['sim', 'nao']).notNullable();  // Campo de processo estruturado de deploy
      table.timestamps(true, true);  // Campos de criação e atualização de dados
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('deploy_estruturado');  // Remove a tabela se necessário
};
