export const up = function(knex) {
    return knex.schema
        .dropTableIfExists('project_activities')
        .dropTableIfExists('projects')
        .dropTableIfExists('users')
        .then(() => {
            return knex.schema
                .createTable('users', table => {
                    table.increments('id').primary();
                    table.string('name').notNullable();
                    table.string('email').unique().notNullable();
                    table.string('password').notNullable();
                    table.enu('role', ['user', 'admin']).defaultTo('user');
                    table.timestamps(true, true);
                })
                .createTable('projects', table => {
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
                    table.boolean('passou_por_testes').defaultTo(false);
                    table.specificType('tipos_testes', 'text[]');
                    
                    // Deploy e Ambiente
                    table.boolean('deploy_automatizado').defaultTo(false);
                    table.boolean('deploy_estruturado').defaultTo(false);
                    table.boolean('implementado').defaultTo(false);
                    table.string('ambiente_implementado');
                    table.boolean('rollback_automatico').defaultTo(false);
                    
                    // Documentação
                    table.boolean('possui_documentacao').defaultTo(false);
                    table.specificType('tipos_documentos', 'text[]');
                    table.text('outros_documentos');
                    table.boolean('documentacao_atualizada').defaultTo(false);
                    
                    // Equipe e Suporte
                    table.string('lider_tecnico');
                    table.string('gerente_projeto');
                    table.string('responsavel_suporte');
                    table.boolean('suporte_disponivel').defaultTo(false);
                    table.string('horario_suporte');
                    
                    // Segurança e Conformidade
                    table.text('medidas_seguranca');
                    table.text('normas_conformidade');
                    
                    table.timestamps(true, true);
                })
                .createTable('project_activities', table => {
                    table.increments('id').primary();
                    table.integer('project_id').references('id').inTable('projects').onDelete('CASCADE');
                    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
                    table.enu('action_type', ['create', 'update', 'delete']).notNullable();
                    table.text('description').notNullable();
                    table.jsonb('changes');
                    table.timestamps(true, true);
                });
        });
};

export const down = function(knex) {
    return knex.schema
        .dropTableIfExists('project_activities')
        .dropTableIfExists('projects')
        .dropTableIfExists('users');
};