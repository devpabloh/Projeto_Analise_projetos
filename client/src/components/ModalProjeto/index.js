/* importando CSS */
import styles from './ModalProjeto.module.css'
import { useState, useEffect } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { projetoService } from '../../services/api';

/* importando os componentes */
import FieldsetInfoGerais from "../FieldsetInfoGerais";
import FieldsetStatusDesen from '../FieldsetStatusDesen';
import FieldSetTecUtili from "../FieldsetTecUtili";
import FieldsetMetodologiaAplicada from "../FieldsetMetodologiaAplicada";
import FieldsetTestesEQualidade from "../FieldsetTestesEQualidade";
import FieldsetAmbienteImplem from "../FieldsetAmbienteImplem";
import FieldsetDocumentacao from "../FieldsetDocumentacao";
import FieldsetEquipeESuporte from "../FieldsetEquipeESuporte";
import FieldsetSegurancaEConformidade from "../FieldsetSegurancaEConformidade";

const initialState = {
    informacoes_gerais: {
        nome_projeto: '',
        descricao_resumida: '',
        data_preenchimento: '',
        responsavel: {
            nome: '',
            cargo: '',
            telefone: '',
            email: ''
        }
    },
    status_desenvolvimento: {
        data_inicial: '',
        data_final: '',
        status_atual: ''
    },
    tecnologias_utilizadas: {
        frontend: '',
        backend: '',
        banco_dados: '',
        apis: ''
    },
    metodologia: {
        metodologia_aplicada: ''
    },
    testes_qualidade: {
        passou_por_testes: '',
        tipos_testes: ''
    },
    ambiente_implementacao: {
        deploy_automatizado: '',
        deploy_estruturado: '',
        implementado: '',
        ambiente_implementado: '',
        rollback_automatico: ''
    },
    documentacao: {
        possui_documentacao: '',
        tipos_documentos: [],
        outros_documentos: '',
        documentacao_atualizada: ''
    },
    equipe_suporte: {
        lider_tecnico: '',
        gerente_projeto: '',
        responsavel_suporte: '',
        suporte_disponivel: '',
        horario_suporte: ''
    },
    seguranca_conformidade: {
        medidas_seguranca: '',
        normas_conformidade: ''
    }
};

const ModalProjeto = ({fecharModal, adicionarProjeto, projetoExistente, modoEdicao}) => {
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState(initialState);

    const handleFieldChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleNestedFieldChange = (section, nestedSection, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [nestedSection]: {
                    ...prev[section][nestedSection],
                    [field]: value
                }
            }
        }));
    };

    useEffect(() => {
        if (projetoExistente && modoEdicao) {
            try {
                const formatarData = (data) => data?.split('T')[0] || '';
                
                if (!projetoExistente.informacoes_gerais || !projetoExistente.status_desenvolvimento) {
                    throw new Error('Dados do projeto inválidos');
                }
                
                setFormData({
                    ...projetoExistente,
                    informacoes_gerais: {
                        ...projetoExistente.informacoes_gerais,
                        data_preenchimento: formatarData(projetoExistente.informacoes_gerais?.data_preenchimento)
                    },
                    status_desenvolvimento: {
                        ...projetoExistente.status_desenvolvimento,
                        data_inicial: formatarData(projetoExistente.status_desenvolvimento?.data_inicial),
                        data_final: formatarData(projetoExistente.status_desenvolvimento?.data_final)
                    }
                });
            } catch (error) {
                console.error('Erro ao carregar dados do projeto:', error);
                showNotification('Erro ao carregar dados do projeto', 'error');
            }
        }
    }, [projetoExistente, modoEdicao, showNotification]);

    useEffect(() => {
        return () => {
            setFormData(initialState); // Limpa o formulário quando o componente é desmontado
        };
    }, []);

    const validateForm = () => {
        if (!formData) {
            showNotification('Erro ao validar formulário', 'error');
            return false;
        }
        const requiredFields = {
            'nome_projeto': 'Nome do projeto',
            'descricao_resumida': 'Descrição',
            'data_preenchimento': 'Data de preenchimento'
        };

        for (const [field, label] of Object.entries(requiredFields)) {
            if (!formData.informacoes_gerais[field]) {
                showNotification(`${label} é obrigatório`, 'error');
                return false;
            }
        }

        if (!formData.informacoes_gerais.responsavel.nome || 
            !formData.informacoes_gerais.responsavel.email) {
            showNotification('Nome e email do responsável são obrigatórios', 'error');
            return false;
        }

        return true;
    };


    const handleSave = async () => {
        try {
            if (!validateForm()) return;
    
            const response = await (modoEdicao 
                ? projetoService.atualizar(projetoExistente.id, formData)
                : projetoService.criar(formData));
    
            if (response?.data) {
                showNotification(`Projeto ${modoEdicao ? 'atualizado' : 'criado'} com sucesso!`, 'success');
                adicionarProjeto(response.data);
                limparFormulario();
                fecharModal();
            } else {
                throw new Error('Resposta inválida do servidor');
            }
        } catch (error) {
            console.error('Erro:', error);
            showNotification(error.message || 'Erro ao salvar o projeto', 'error');
        }
    };

    const lidarComEnvio = async (evento) => {
        evento.preventDefault();
        await handleSave();
    };

    const sairAoClicarForaDoModal = (evento) => {
        if(evento.target === evento.currentTarget){
            if (verificarMudancas()) {
                if (window.confirm('Existem alterações não salvas. Deseja realmente sair?')) {
                    limparFormulario();
                    fecharModal();
                }
            } else {
                fecharModal();
            }
        }
    };

    const limparFormulario = () => {
        setFormData(initialState);
    };

    const verificarMudancas = () => {
        return Object.keys(formData).some(key => {
            const section = formData[key];
            return Object.values(section).some(value => 
                Array.isArray(value) ? value.length > 0 : Boolean(value)
            );
        });
    };

    const handleCancelar = () => {
        if (verificarMudancas()) {
            if (window.confirm('Existem alterações não salvas. Deseja realmente sair?')) {
                limparFormulario();
                fecharModal();
            }
        } else {
            fecharModal();
        }
    };

return (
    <div className={styles.containerModal} onClick={sairAoClicarForaDoModal}>
        <div className={styles.modal}>
            <h2>{modoEdicao ? 'Editar Projeto' : 'Adicionar Projeto'}</h2>
            <form onSubmit={lidarComEnvio}>
                <fieldset>
                    <legend>Informações do Projeto</legend>
                    <FieldsetInfoGerais
                        nomeProjeto={formData.informacoes_gerais.nome_projeto}
                        setNomeProjeto={(value) => handleFieldChange('informacoes_gerais', 'nome_projeto', value)}
                        descricaoResumida={formData.informacoes_gerais.descricao_resumida}
                        setDescricaoResumida={(value) => handleFieldChange('informacoes_gerais', 'descricao_resumida', value)}
                        dataPreenchimento={formData.informacoes_gerais.data_preenchimento}
                        setDataPreenchimento={(value) => handleFieldChange('informacoes_gerais', 'data_preenchimento', value)}
                        nomeResponsavelPreenchimento={formData.informacoes_gerais.responsavel.nome}
                        setNomeResponsavelPreenchimento={(value) => handleNestedFieldChange('informacoes_gerais', 'responsavel', 'nome', value)}
                        cargoResponsavelPreenchimento={formData.informacoes_gerais.responsavel.cargo}
                        setCargoResponsavelPreenchimento={(value) => handleNestedFieldChange('informacoes_gerais', 'responsavel', 'cargo', value)}
                        telefoneResponsavelPreenchimento={formData.informacoes_gerais.responsavel.telefone}
                        setTelefoneResponsavelPreenchimento={(value) => handleNestedFieldChange('informacoes_gerais', 'responsavel', 'telefone', value)}
                        emailResponsavelPreenchimento={formData.informacoes_gerais.responsavel.email}
                        setEmailResponsavelPreenchimento={(value) => handleNestedFieldChange('informacoes_gerais', 'responsavel', 'email', value)}
                    />
                    <FieldsetStatusDesen
                        dataInicial={formData.status_desenvolvimento.data_inicial}
                        setDataInicial={(value) => handleFieldChange('status_desenvolvimento', 'data_inicial', value)}
                        dataFinal={formData.status_desenvolvimento.data_final}
                        setDataFinal={(value) => handleFieldChange('status_desenvolvimento', 'data_final', value)}
                        status={formData.status_desenvolvimento.status_atual}
                        setStatus={(value) => handleFieldChange('status_desenvolvimento', 'status_atual', value)}
                    />
                    <FieldSetTecUtili
                        frontend={formData.tecnologias_utilizadas.frontend}
                        setFrontend={(value) => handleFieldChange('tecnologias_utilizadas', 'frontend', value)}
                        tecnologiasBackend={formData.tecnologias_utilizadas.backend}
                        setTecnologiasBackend={(value) => handleFieldChange('tecnologias_utilizadas', 'backend', value)}
                        tecnologiasBancoDeDados={formData.tecnologias_utilizadas.banco_dados}
                        setTecnologiasBancoDeDados={(value) => handleFieldChange('tecnologias_utilizadas', 'banco_dados', value)}
                        tecnologiasAPIs={formData.tecnologias_utilizadas.apis}
                        setTecnologiasAPIs={(value) => handleFieldChange('tecnologias_utilizadas', 'apis', value)}
                    />
                    <FieldsetMetodologiaAplicada
                        qualMetodologiaAplicada={formData.metodologia.metodologia_aplicada}
                        setQualMetodologiaAplicada={(value) => handleFieldChange('metodologia', 'metodologia_aplicada', value)}
                    />
                    <FieldsetTestesEQualidade
                        passouPorTestes={formData.testes_qualidade.passou_por_testes}
                        setPassouPorTestes={(value) => handleFieldChange('testes_qualidade', 'passou_por_testes', value)}
                        quaisTestes={formData.testes_qualidade.tipos_testes}
                        setQuaisTestes={(value) => handleFieldChange('testes_qualidade', 'tipos_testes', value)}
                    />
                    <FieldsetAmbienteImplem
                        deployAutomatizado={formData.ambiente_implementacao.deploy_automatizado}
                        setDeployAutomatizado={(value) => handleFieldChange('ambiente_implementacao', 'deploy_automatizado', value)}
                        deployEstruturado={formData.ambiente_implementacao.deploy_estruturado}
                        setDeployEstruturado={(value) => handleFieldChange('ambiente_implementacao', 'deploy_estruturado', value)}
                        implementado={formData.ambiente_implementacao.implementado}
                        setImplementado={(value) => handleFieldChange('ambiente_implementacao', 'implementado', value)}
                        rollbackAutomatico={formData.ambiente_implementacao.rollback_automatico}
                        setRollbackAutomatico={(value) => handleFieldChange('ambiente_implementacao', 'rollback_automatico', value)}
                        foiImplementadoQual={formData.ambiente_implementacao.ambiente_implementado}
                        setFoiImplementadoQual={(value) => handleFieldChange('ambiente_implementacao', 'ambiente_implementado', value)}
                    />
                    <FieldsetDocumentacao
                        documentacaoTecnica={formData.documentacao.possui_documentacao}
                        setDocumentacaoTecnica={(value) => handleFieldChange('documentacao', 'possui_documentacao', value)}
                        selectedOptions={formData.documentacao.tipos_documentos}
                        setSelectedOptions={(value) => handleFieldChange('documentacao', 'tipos_documentos', value)}
                        outrosDocumentosTecnicos={formData.documentacao.outros_documentos}
                        setOutrosDocumentosTecnicos={(value) => handleFieldChange('documentacao', 'outros_documentos', value)}
                        docAtualizado={formData.documentacao.documentacao_atualizada}
                        setDocAtualizado={(value) => handleFieldChange('documentacao', 'documentacao_atualizada', value)}
                    />
                    <FieldsetEquipeESuporte
                        nomeLiderTecnico={formData.equipe_suporte.lider_tecnico}
                        setNomeLiderTecnico={(value) => handleFieldChange('equipe_suporte', 'lider_tecnico', value)}
                        nomeGerenteProjeto={formData.equipe_suporte.gerente_projeto}
                        setNomeGerenteProjeto={(value) => handleFieldChange('equipe_suporte', 'gerente_projeto', value)}
                        nomeResponsavelSuporte={formData.equipe_suporte.responsavel_suporte}
                        setNomeResponsavelSuporte={(value) => handleFieldChange('equipe_suporte', 'responsavel_suporte', value)}
                        existeSuporteTecnicoDisponivel={formData.equipe_suporte.suporte_disponivel}
                        setExisteSuporteTecnicoDisponivel={(value) => handleFieldChange('equipe_suporte', 'suporte_disponivel', value)}
                        horarioSuporte={formData.equipe_suporte.horario_suporte}
                        setHorarioSuporte={(value) => handleFieldChange('equipe_suporte', 'horario_suporte', value)}
                    />
                    <FieldsetSegurancaEConformidade
                        formaImplementacaoMedidaSeguranca={formData.seguranca_conformidade.medidas_seguranca}
                        setFormaImplementacaoMedidaSeguranca={(value) => handleFieldChange('seguranca_conformidade', 'medidas_seguranca', value)}
                        normaConformidade={formData.seguranca_conformidade.normas_conformidade}
                        setNormaConformidade={(value) => handleFieldChange('seguranca_conformidade', 'normas_conformidade', value)}
                    />
                </fieldset>
                <div className={styles.containerBotoesModal}>
                    <button type="button" onClick={handleCancelar}>
                        Cancelar
                    </button>
                    <button type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
};

export default ModalProjeto;