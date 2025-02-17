// Migration para criar a tabela metodologia_aplicada
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('metodologia_aplicada', function(table) {
      table.increments('id').primary();
      table.enu('metodologia', ['agil', 'scrum', 'kanban', 'cascata', 'extremeProgramming', 'leanDevelopment', 'tdd']).notNullable();
      table.timestamps(true, true);
    });
  };
  
    /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('metodologia_aplicada');
  };
  
