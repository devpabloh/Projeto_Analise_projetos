/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('equipe_suporte', function(table) {
      table.increments('id').primary();
      table.string('lider_tecnico').notNullable();
      table.string('gerente_projeto').notNullable();
      table.string('responsavel_suporte').notNullable();
      table.boolean('suporte_disponivel').notNullable();
      table.string('horario_suporte').notNullable();
      table.integer('projeto_id').unsigned().references('id').inTable('informacoes_gerais').onDelete('CASCADE');
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