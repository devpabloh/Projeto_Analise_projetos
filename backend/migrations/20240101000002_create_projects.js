export const up = function(knex) {
  return knex.schema.createTable('projects', table => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      
      // Informações Gerais
      table.string('nome_projeto').notNullable();
      table.text('descricao_resumida');
      table.date('data_preenchimento');
      
      // Responsável
      table.string('responsavel_nome');
      table.string('responsavel_cargo');
      table.string('responsavel_telefone');
      table.string('responsavel_email');
      
      // Status Desenvolvimento
      table.date('data_inicial');
      table.date('data_final');
      table.string('status_atual');
      
      // Tecnologias
      table.string('frontend');
      table.string('backend');
      table.string('banco_dados');
      table.string('apis');
      
      // Metodologia
      table.string('metodologia_aplicada');
      
      // Testes
      table.string('passou_por_testes');
      table.text('tipos_testes');
      
      // Ambiente
      table.string('deploy_automatizado');
      table.string('deploy_estruturado');
      table.string('implementado');
      table.string('ambiente_implementado');
      table.string('rollback_automatico');
      
      // Documentação
      table.string('possui_documentacao');
      table.specificType('tipos_documentos', 'text[]');
      table.text('outros_documentos');
      table.string('documentacao_atualizada');
      
      // Equipe e Suporte
      table.string('lider_tecnico');
      table.string('gerente_projeto');
      table.string('responsavel_suporte');
      table.string('suporte_disponivel');
      table.string('horario_suporte');
      
      // Segurança
      table.text('medidas_seguranca');
      table.text('normas_conformidade');
      
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = function(knex) {
  return knex.schema.dropTable('projects');
};