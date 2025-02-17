// Migration para criar a tabela rollback_automatico
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('rollback_automatico', function(table) {
      table.increments('id').primary();
      table.enu('rollback', ['sim', 'nao']).notNullable();
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('rollback_automatico');
  };
