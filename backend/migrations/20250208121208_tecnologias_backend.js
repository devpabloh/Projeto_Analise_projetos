/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tecnologias_backend', function(table) {
      table.increments('id').primary();  // Identificador único para cada tecnologia de back-end
      table.string('nome_backend').notNullable().unique();  // Nome da tecnologia de back-end (por exemplo, 'nodeJs', 'python')
      table.string('descricao').notNullable();  // Descrição da tecnologia de back-end (por exemplo, 'Node.js', 'Python')
      table.timestamps(true, true);  // Campos de criação e atualização de dados
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tecnologias_backend');  // Remove a tabela se necessário
};

