/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('implementacao_projeto', function(table) {
      table.increments('id').primary();
      table.enu('ambiente', ['AmbienteDeDesenvolvimento', 'AmbienteDeHomologacao', 'AmbienteDeProducao']).notNullable();
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('implementacao_projeto');
  };
