/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('suporte_tecnico_disponivel', function(table) {
      table.increments('id').primary();
      table.enu('existe_suporte', ['sim', 'nao']).notNullable();
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('suporte_tecnico_disponivel');
  };
