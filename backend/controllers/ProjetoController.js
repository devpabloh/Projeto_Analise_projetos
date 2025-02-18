const InformacoesGerais = require('../models/20250208121051_create_informacoes_gerais');
const StatusDesenvolvimento = require('../models/20250208121207_status_desenvolvimento');
const TecnologiasBackend = require('../models/20250208121208_tecnologias_backend');
const TecnologiasBancoDados = require('../models/20250208121320_tecnologias_banco_de_dados');
const Frontend = require('../models/20250208121735_frontend');
const MetodologiaAplicada = require('../models/20250208121739_metodologia_aplicada');
const TestesQualidade = require('../models/20250208121324_testes_qualidade');
const DeployAutomatizado = require('../models/20250208121321_deploy_automatizado');
const DeployEstruturado = require('../models/20250208121322_deploy_estruturado');
const ImplementacaoProjeto = require('../models/20250208121733_implementacao_projeto');
const RollbackAutomatico = require('../models/20250208121959_rollback_automatico');
const Documentacao = require('../models/20250208121323_doc_atualizado');
const EquipeESuporte = require('../models/20250208121050_create_equipe_suporte');
const SegurancaConformidade = require('../models/20250208121737_norma_conformidade');

class ProjetoController {
  async create(req, res) {
      try {
          const {
              informacoes_gerais,
              status_desenvolvimento,
              tecnologias_utilizadas,
              metodologia,
              testes_qualidade,
              ambiente_implementacao,
              documentacao,
              equipe_suporte,
              seguranca_conformidade
          } = req.body;

          const infoGerais = await InformacoesGerais.create({
              nome_projeto: informacoes_gerais.nome_projeto,
              descricao_resumida: informacoes_gerais.descricao_resumida,
              data_preenchimento: informacoes_gerais.data_preenchimento,
              nome_responsavel: informacoes_gerais.responsavel.nome,
              cargo_responsavel: informacoes_gerais.responsavel.cargo,
              telefone_responsavel: informacoes_gerais.responsavel.telefone,
              email_responsavel: informacoes_gerais.responsavel.email
          });

          await StatusDesenvolvimento.create({
            data_inicial: status_desenvolvimento.data_inicial,
            data_final: status_desenvolvimento.data_final,
            status: status_desenvolvimento.status_atual,
            projeto_id: infoGerais.id
        });

          await Frontend.create({
              tecnologia: tecnologias_utilizadas.frontend,
              projeto_id: infoGerais.id
          });

          await TecnologiasBackend.create({
              nome_backend: tecnologias_utilizadas.backend,
              descricao: `Tecnologia ${tecnologias_utilizadas.backend}`,
              projeto_id: infoGerais.id
          });

          await TecnologiasBancoDados.create({
              nome_banco_de_dados: tecnologias_utilizadas.banco_dados,
              descricao: `Banco de dados ${tecnologias_utilizadas.banco_dados}`,
              projeto_id: infoGerais.id
          });

          await MetodologiaAplicada.create({
              metodologia: metodologia.metodologia_aplicada,
              projeto_id: infoGerais.id
          });

          await TestesQualidade.create({
              passou_por_testes: testes_qualidade.passou_por_testes,
              tipos_testes: testes_qualidade.tipos_testes,
              projeto_id: infoGerais.id
          });

          await DeployAutomatizado.create({
              status_deploy: ambiente_implementacao.deploy_automatizado,
              projeto_id: infoGerais.id
          });

          await DeployEstruturado.create({
              processo_deploy: ambiente_implementacao.deploy_estruturado,
              projeto_id: infoGerais.id
          });

          await ImplementacaoProjeto.create({
              implementado: ambiente_implementacao.implementado,
              ambiente: ambiente_implementacao.ambiente_implementado,
              projeto_id: infoGerais.id
          });

          await RollbackAutomatico.create({
              rollback: ambiente_implementacao.rollback_automatico,
              projeto_id: infoGerais.id
          });

          await SegurancaConformidade.create({
            medidas_seguranca: seguranca_conformidade.medidas_seguranca,
            normas: seguranca_conformidade.normas_conformidade,
            projeto_id: infoGerais.id
        });

        await TestesQualidade.create({
          passou_por_testes: testes_qualidade.passou_por_testes === 'sim' ? true : false,
          tipos_testes: testes_qualidade.tipos_testes,
          projeto_id: infoGerais.id
      });

          await Documentacao.create({
            possui_documentacao: documentacao.possui_documentacao === 'sim' ? true : false,
            tipos_documentos: documentacao.tipos_documentos,
            outros_documentos: documentacao.outros_documentos,
            documentacao_atualizada: documentacao.documentacao_atualizada === 'sim' ? true : false,
            projeto_id: infoGerais.id
        });

        await EquipeESuporte.create({
          lider_tecnico: equipe_suporte.lider_tecnico,
          gerente_projeto: equipe_suporte.gerente_projeto,
          responsavel_suporte: equipe_suporte.responsavel_suporte,
          suporte_disponivel: equipe_suporte.suporte_disponivel === 'sim' ? true : false,
          horario_suporte: equipe_suporte.horario_suporte,
          projeto_id: infoGerais.id
      });

      return res.status(201).json({
        message: 'Projeto criado com sucesso',
        projeto_id: infoGerais.id
    });

} catch (error) {
    console.error('Erro ao criar projeto:', error);
    return res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message
    });
}
}
}

module.exports = new ProjetoController();