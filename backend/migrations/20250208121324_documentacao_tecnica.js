/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('documentacao_tecnica', function(table) {
      table.increments('id').primary();
      table.boolean('tem_documentacao_tecnica').notNullable();
      table.specificType('tipos_documentacao_tecnica', 'text[]');
      table.string('outros_documentos');
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('documentacao_tecnica');
  };