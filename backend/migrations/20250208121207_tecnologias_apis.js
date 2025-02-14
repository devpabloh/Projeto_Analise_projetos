/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tecnologias_apis', function(table) {
      table.increments('id').primary();  // Identificador único para cada API
      table.string('nome_api').notNullable().unique();  // Nome da API (por exemplo, 'apiRest', 'apiSoap')
      table.string('descricao').notNullable();  // Descrição da API (por exemplo, 'APIs Rest', 'APIs Soap')
      table.timestamps(true, true);  // Data de criação e atualização
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tecnologias_apis');  // Remove a tabela se necessário
};
