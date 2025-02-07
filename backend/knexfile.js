// knexfile.js serve para configurar o banco de dados usado pelo knex 
// knexfile.js (Configuração do Knex)
module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'seu_usuario',
        password: 'sua_senha',
        database: 'seu_banco_de_dados'
      },
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }
    }
  };
  
  // Migration para criar a tabela equipe_suporte
  exports.up = function(knex) {
    return knex.schema.createTable('equipe_suporte', function(table) {
      table.increments('id').primary();
      table.string('nome_lider_tecnico').notNullable();
      table.string('nome_gerente_projeto').notNullable();
      table.string('nome_responsavel_suporte').notNullable();
      table.string('suporte_tecnico_disponivel').notNullable();
      table.string('horario_suporte').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('equipe_suporte');
  };
  
  // Migration para criar a tabela medidas_seguranca
  exports.up = function(knex) {
    return knex.schema.createTable('medidas_seguranca', function(table) {
      table.increments('id').primary();
      table.boolean('criptografia_dados').defaultTo(false);
      table.boolean('controle_acesso_autenticacao').defaultTo(false);
      table.string('outras_medidas_seguranca');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('medidas_seguranca');
  };
  
  // Migration para criar a tabela informacoes_gerais
  exports.up = function(knex) {
    return knex.schema.createTable('informacoes_gerais', function(table) {
      table.increments('id').primary();
      table.string('nome_projeto').notNullable();
      table.text('descricao_resumida').notNullable();
      table.date('data_preenchimento').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('informacoes_gerais');
  };
  
  // Migration para criar a tabela status_desenvolvimento
  exports.up = function(knex) {
    return knex.schema.createTable('status_desenvolvimento', function(table) {
      table.increments('id').primary();
      table.date('data_inicial').notNullable();
      table.date('data_final').notNullable();
      table.enu('status', ['inicio', 'desenvolvimento', 'testes', 'homologacao', 'producao', 'encerrado']).notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('status_desenvolvimento');
  };
  
  // Migration para criar a tabela medidas_seguranca
  exports.up = function(knex) {
    return knex.schema.createTable('medidas_seguranca', function(table) {
      table.increments('id').primary();  // Identificador único para cada registro
      table.boolean('criptografia_dados').defaultTo(false);  // Medida de segurança para criptografia
      table.boolean('controle_acesso_autenticacao').defaultTo(false);  // Medida para controle de acesso
      table.string('outras_medidas_seguranca');  // Campo de texto para outras medidas de segurança
      table.timestamps(true, true);  // Registra a data de criação e atualização
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('medidas_seguranca');
  };
  
  // Migration para criar a tabela tecnologias_apis
  exports.up = function(knex) {
    return knex.schema.createTable('tecnologias_apis', function(table) {
      table.increments('id').primary();  // Identificador único para cada API
      table.string('nome_api').notNullable().unique();  // Nome da API (por exemplo, 'apiRest', 'apiSoap')
      table.string('descricao').notNullable();  // Descrição da API (por exemplo, 'APIs Rest', 'APIs Soap')
      table.timestamps(true, true);  // Data de criação e atualização
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tecnologias_apis');  // Remove a tabela se necessário
  };
  
  exports.up = function(knex) {
    return knex.schema.createTable('tecnologias_backend', function(table) {
      table.increments('id').primary();  // Identificador único para cada tecnologia de back-end
      table.string('nome_backend').notNullable().unique();  // Nome da tecnologia de back-end (por exemplo, 'nodeJs', 'python')
      table.string('descricao').notNullable();  // Descrição da tecnologia de back-end (por exemplo, 'Node.js', 'Python')
      table.timestamps(true, true);  // Campos de criação e atualização de dados
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tecnologias_backend');  // Remove a tabela se necessário
  };
  
  // Migration para criar a tabela tecnologias_banco_de_dados
  exports.up = function(knex) {
    return knex.schema.createTable('tecnologias_banco_de_dados', function(table) {
      table.increments('id').primary();  // Identificador único para cada banco de dados
      table.string('nome_banco_de_dados').notNullable().unique();  // Nome da tecnologia do banco de dados (por exemplo, 'mySql', 'postgreSql')
      table.string('descricao').notNullable();  // Descrição do banco de dados (por exemplo, 'MySQL', 'PostgreSQL')
      table.timestamps(true, true);  // Campos de criação e atualização de dados
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tecnologias_banco_de_dados');  // Remove a tabela se necessário
  };
  
  exports.up = function(knex) {
    return knex.schema.createTable('deploy_automatizado', function(table) {
      table.increments('id').primary();  // Identificador único para cada registro de implantação automatizada
      table.enu('status_deploy', ['sim', 'nao', 'parcialmente']).notNullable();  // Campo de status da implantação automatizada
      table.timestamps(true, true);  // Campos de criação e atualização de dados
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('deploy_automatizado');  // Remove a tabela se necessário
  };
  
  // Migration para criar a tabela deploy_estruturado
  exports.up = function(knex) {
    return knex.schema.createTable('deploy_estruturado', function(table) {
      table.increments('id').primary();  // Identificador único para cada registro
      table.enu('processo_deploy', ['sim', 'nao']).notNullable();  // Campo de processo estruturado de deploy
      table.timestamps(true, true);  // Campos de criação e atualização de dados
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('deploy_estruturado');  // Remove a tabela se necessário
  };
  
  // Migration para criar a tabela doc_atualizado
  exports.up = function(knex) {
    return knex.schema.createTable('doc_atualizado', function(table) {
      table.increments('id').primary();  // Identificador único para cada registro
      table.enu('status_documentacao', ['sim', 'nao', 'parcialmente']).notNullable();  // Campo que armazena o status da documentação
      table.timestamps(true, true);  // Campos de criação e atualização de dados
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('doc_atualizado');  // Remove a tabela se necessário
  };
  