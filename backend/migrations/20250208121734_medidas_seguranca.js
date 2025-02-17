/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('medidas_seguranca', function(table) {
      // Armazena a resposta do select do componente SelectForamImplemMedidSegu
      // Utilizando enum para manter os valores "sim" ou "nao"
      table.enu('foi_implementado', ['sim', 'nao']).notNullable().defaultTo('nao');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.alterTable('medidas_seguranca', function(table) {
      table.dropColumn('foi_implementado');
    });
  };
