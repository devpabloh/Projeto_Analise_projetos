/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('deploy_automatizado', function(table) {
      table.increments('id').primary();  // Identificador único para cada registro de implantação automatizada
      table.enu('status_deploy', ['sim', 'nao', 'parcialmente']).notNullable();  // Campo de status da implantação automatizada
      table.timestamps(true, true);  // Campos de criação e atualização de dados
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('deploy_automatizado');  // Remove a tabela se necessário
};
