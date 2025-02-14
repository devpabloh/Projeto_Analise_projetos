/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('equipe_suporte', function(table) {
      table.increments('id').primary();
      table.string('nome_lider_tecnico').notNullable();
      table.string('nome_gerente_projeto').notNullable();
      table.string('nome_responsavel_suporte').notNullable();
      table.string('suporte_tecnico_disponivel').notNullable();
      table.string('horario_suporte').notNullable();
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('equipe_suporte');
};
