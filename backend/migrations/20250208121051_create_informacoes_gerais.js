/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('informacoes_gerais', function(table) {
      table.increments('id').primary();
      table.string('nome_projeto').notNullable();
      table.text('descricao_resumida').notNullable();
      table.date('data_preenchimento').notNullable();
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('informacoes_gerais');
};
