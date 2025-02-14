/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tecnologias_banco_de_dados', function(table) {
      table.increments('id').primary();  // Identificador único para cada banco de dados
      table.string('nome_banco_de_dados').notNullable().unique();  // Nome da tecnologia do banco de dados
      table.string('descricao').notNullable();  // Descrição do banco de dados
      table.timestamps(true, true);  // Campos de criação e atualização de dados
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tecnologias_banco_de_dados');  // Remove a tabela se necessário
};
