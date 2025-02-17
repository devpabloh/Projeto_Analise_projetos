/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('horario_suporte', function(table) {
      table.increments('id').primary();  // Identificador único para cada registro
      table.enu('horario', [
        'horarioComercial',
        'vinteEQuatroPorSete',
        'apenasEmHorarioCritico'
      ]).notNullable();  // Campo para armazenar o horário do suporte
      table.timestamps(true, true);  // Campos de criação e atualização de registros
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('horario_suporte');  // Remove a tabela se necessário
  };
  
