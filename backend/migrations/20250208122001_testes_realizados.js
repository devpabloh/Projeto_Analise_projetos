/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('testes_realizados', function(table) {
      table.increments('id').primary();  // ID único para cada registro
      table.enu('passou_por_testes', ['sim', 'nao']).notNullable();  // Indica se o projeto passou por testes
      table.enu('tipo_teste', ['unitarios', 'integracao', 'aceitacao', 'performance']).nullable();  // Tipo de teste realizado
      table.text('outras_medidas').nullable();  // Campo para armazenar outras medidas de segurança opcionais
      table.timestamps(true, true);  // Datas de criação e atualização do registro
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('testes_realizados');  // Remove a tabela se necessário
  };
