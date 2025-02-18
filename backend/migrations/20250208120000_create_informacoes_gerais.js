/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.schema.createTable('informacoes_gerais', function(table) {
    table.increments('id').primary();
    table.string('nome_projeto').notNullable();
    table.text('descricao_resumida').notNullable();
    table.date('data_preenchimento').notNullable();
    // Campos do responsável
    table.string('nome_responsavel').notNullable();
    table.string('cargo_responsavel').notNullable();
    table.string('telefone_responsavel').notNullable();
    table.string('email_responsavel').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return await knex.schema.dropTable('informacoes_gerais');
};