// knexfile.js
require('dotenv').config();
console.log('DB_PASSWORD:', process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD);

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT, 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  // Outras configurações...
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


// Migration para criar a tabela documentacao_tecnica
exports.up = function(knex) {
  return knex.schema.createTable('documentacao_tecnica', function(table) {
    table.increments('id').primary();
    table.boolean('tem_documentacao_tecnica').notNullable();
    table.specificType('tipos_documentacao_tecnica', 'text[]');
    table.string('outros_documentos');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('documentacao_tecnica');
};

// Migration para criar a tabela implementacao_projeto
exports.up = function(knex) {
  return knex.schema.createTable('implementacao_projeto', function(table) {
    table.increments('id').primary();
    table.enu('ambiente', ['AmbienteDeDesenvolvimento', 'AmbienteDeHomologacao', 'AmbienteDeProducao']).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('implementacao_projeto');
};

// MIGRAÇÃO NOVA: Alterar a tabela medidas_seguranca para incluir a coluna que armazena se as medidas foram implementadas
exports.up = function(knex) {
  return knex.schema.alterTable('medidas_seguranca', function(table) {
    // Armazena a resposta do select do componente SelectForamImplemMedidSegu
    // Utilizando enum para manter os valores "sim" ou "nao"
    table.enu('foi_implementado', ['sim', 'nao']).notNullable().defaultTo('nao');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('medidas_seguranca', function(table) {
    table.dropColumn('foi_implementado');
  });
};

// Migration para criar a tabela frontend
exports.up = function(knex) {
  return knex.schema.createTable('frontend', function(table) {
    table.increments('id').primary();  // Identificador único para cada registro
    table.enu('tecnologia', ['react', 'vue', 'angular', 'svelte', 'aspNetCoreMvc']).notNullable();  // Campo para armazenar a tecnologia selecionada
    table.timestamps(true, true);  // Campos de criação e atualização de registros
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('frontend');  // Remove a tabela se necessário
};

// Migration para criar a tabela horario_suporte
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

exports.down = function(knex) {
  return knex.schema.dropTable('horario_suporte');  // Remove a tabela se necessário
};

// Migration para criar a tabela norma_conformidade
exports.up = function(knex) {
  return knex.schema.createTable('norma_conformidade', function(table) {
    table.increments('id').primary();
    // Armazena se o projeto atende alguma norma de conformidade: 'sim' ou 'nao'
    table.enu('atende_norma', ['sim', 'nao']).notNullable();
    // Caso atenda, armazena os tipos de normas selecionadas como um array de textos
    table.specificType('quais_normas', 'text[]');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('norma_conformidade');
};

// Migration para criar a tabela metodologia_aplicada
exports.up = function(knex) {
  return knex.schema.createTable('metodologia_aplicada', function(table) {
    table.increments('id').primary();
    table.enu('metodologia', ['agil', 'scrum', 'kanban', 'cascata', 'extremeProgramming', 'leanDevelopment', 'tdd']).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('metodologia_aplicada');
};

// Migration para criar a tabela rollback_automatico
exports.up = function(knex) {
  return knex.schema.createTable('rollback_automatico', function(table) {
    table.increments('id').primary();
    table.enu('rollback', ['sim', 'nao']).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('rollback_automatico');
};

exports.up = function(knex) {
  return knex.schema.createTable('suporte_tecnico_disponivel', function(table) {
    table.increments('id').primary();
    table.enu('existe_suporte', ['sim', 'nao']).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('suporte_tecnico_disponivel');
};

exports.up = function(knex) {
  return knex.schema.createTable('testes_realizados', function(table) {
    table.increments('id').primary();  // ID único para cada registro
    table.enu('passou_por_testes', ['sim', 'nao']).notNullable();  // Indica se o projeto passou por testes
    table.enu('tipo_teste', ['unitarios', 'integracao', 'aceitacao', 'performance']).nullable();  // Tipo de teste realizado
    table.text('outras_medidas').nullable();  // Campo para armazenar outras medidas de segurança opcionais
    table.timestamps(true, true);  // Datas de criação e atualização do registro
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('testes_realizados');  // Remove a tabela se necessário
};
