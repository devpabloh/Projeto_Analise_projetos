/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('frontend', function(table) {
      table.increments('id').primary();  // Identificador único para cada registro
      table.enu('tecnologia', ['react', 'vue', 'angular', 'svelte', 'aspNetCoreMvc']).notNullable();  // Campo para armazenar a tecnologia selecionada
      table.timestamps(true, true);  // Campos de criação e atualização de registros
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('frontend');  // Remove a tabela se necessário
  };
