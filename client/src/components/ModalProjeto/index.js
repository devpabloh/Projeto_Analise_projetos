/* importando CSS */
import styles from './ModalProjeto.module.css'
import { useState, useEffect } from 'react';

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

const ModalProjeto = ({fecharModal, adicionarProjeto, projetoExistente, modoEdicao}) => {
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [descricaoResumida, setDescricaoResumida] = useState('');
    const [dataPreenchimento, setDataPreenchimento] = useState('');
    const [nomeResponsavelPreenchimento, setNomeResponsavelPreenchimento] = useState('');
    const [cargoResponsavelPreenchimento, setCargoResponsavelPreenchimento] = useState('');
    const [telefoneResponsavelPreenchimento, setTelefoneResponsavelPreenchimento] = useState('');
    const [emailResponsavelPreenchimento, setEmailResponsavelPreenchimento] = useState('');
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [status, setStatus] = useState('');
    const [frontend, setFrontend] = useState('');
    const [tecnologiasBackend, setTecnologiasBackend] = useState("");
    const [tecnologiasBancoDeDados, setTecnologiasBancoDeDados] = useState('');
    const [tecnologiasAPIs, setTecnologiasAPIs] = useState('');
    const [qualMetodologiaAplicada, setQualMetodologiaAplicada] = useState("");
    const [quaisTestes, setQuaisTestes] = useState('')
    const [passouPorTestes, setPassouPorTestes] = useState('');
    const [deployAutomatizado, setDeployAutomatizado] = useState('')
    const [deployEstruturado, setDeployEstruturado] = useState('')
    const [implementado, setImplementado] = useState('')
    const [rollbackAutomatico, setRollbackAutomatico] = useState('')
    const [documentacaoTecnica, setDocumentacaoTecnica] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [outrosDocumentosTecnicos, setOutrosDocumentosTecnicos] = useState('');
    const [docAtualizado, setDocAtualizado] = useState('')
    const [nomeLiderTecnico, setNomeLiderTecnico] = useState('');
    const [nomeGerenteProjeto, setNomeGerenteProjeto] = useState('');
    const [nomeResponsavelSuporte, setNomeResponsavelSuporte] = useState('');
    const [existeSuporteTecnicoDisponivel, setExisteSuporteTecnicoDisponivel] = useState('');
    const [horarioSuporte, setHorarioSuporte] = useState('')
    const [formaImplementacaoMedidaSeguranca, setFormaImplementacaoMedidaSeguranca] = useState('')
    const [normaConformidade, setNormaConformidade] = useState('')
    const [foiImplementadoQual, setFoiImplementadoQual] = useState('')

    useEffect(() => {
        console.log('projetoExistente:', projetoExistente);
        console.log('modoEdicao:', modoEdicao);
    
        if (projetoExistente && modoEdicao) {
            try {
                // Informações Gerais
                setNomeProjeto(projetoExistente.informacoes_gerais?.nome_projeto || '');
                setDescricaoResumida(projetoExistente.informacoes_gerais?.descricao_resumida || '');
                setDataPreenchimento(projetoExistente.informacoes_gerais?.data_preenchimento?.split('T')[0] || '');
                setNomeResponsavelPreenchimento(projetoExistente.informacoes_gerais?.responsavel?.nome || '');
                setCargoResponsavelPreenchimento(projetoExistente.informacoes_gerais?.responsavel?.cargo || '');
                setTelefoneResponsavelPreenchimento(projetoExistente.informacoes_gerais?.responsavel?.telefone || '');
                setEmailResponsavelPreenchimento(projetoExistente.informacoes_gerais?.responsavel?.email || '');
        
                // Status Desenvolvimento
                setDataInicial(projetoExistente.status_desenvolvimento?.data_inicial?.split('T')[0] || '');
                setDataFinal(projetoExistente.status_desenvolvimento?.data_final?.split('T')[0] || '');
                setStatus(projetoExistente.status_desenvolvimento?.status_atual || '');
        
                // Tecnologias
                setFrontend(projetoExistente.tecnologias_utilizadas?.frontend || '');
                setTecnologiasBackend(projetoExistente.tecnologias_utilizadas?.backend || '');
                setTecnologiasBancoDeDados(projetoExistente.tecnologias_utilizadas?.banco_dados || '');
                setTecnologiasAPIs(projetoExistente.tecnologias_utilizadas?.apis || '');
        
                // Metodologia
                setQualMetodologiaAplicada(projetoExistente.metodologia?.metodologia_aplicada || '');
        
                // Testes
                setPassouPorTestes(projetoExistente.testes_qualidade?.passou_por_testes || '');
                setQuaisTestes(projetoExistente.testes_qualidade?.tipos_testes || '');
        
                // Ambiente
                setDeployAutomatizado(projetoExistente.ambiente_implementacao?.deploy_automatizado || '');
                setDeployEstruturado(projetoExistente.ambiente_implementacao?.deploy_estruturado || '');
                setImplementado(projetoExistente.ambiente_implementacao?.implementado || '');
                setRollbackAutomatico(projetoExistente.ambiente_implementacao?.rollback_automatico || '');
                setFoiImplementadoQual(projetoExistente.ambiente_implementacao?.ambiente_implementado || '');
        
                // Documentação
                setDocumentacaoTecnica(projetoExistente.documentacao?.possui_documentacao || '');
                setSelectedOptions(projetoExistente.documentacao?.tipos_documentos || []);
                setOutrosDocumentosTecnicos(projetoExistente.documentacao?.outros_documentos || '');
                setDocAtualizado(projetoExistente.documentacao?.documentacao_atualizada || '');
        
                // Equipe e Suporte
                setNomeLiderTecnico(projetoExistente.equipe_suporte?.lider_tecnico || '');
                setNomeGerenteProjeto(projetoExistente.equipe_suporte?.gerente_projeto || '');
                setNomeResponsavelSuporte(projetoExistente.equipe_suporte?.responsavel_suporte || '');
                setExisteSuporteTecnicoDisponivel(projetoExistente.equipe_suporte?.suporte_disponivel || '');
                setHorarioSuporte(projetoExistente.equipe_suporte?.horario_suporte || '');
        
                // Segurança
                setFormaImplementacaoMedidaSeguranca(projetoExistente.seguranca_conformidade?.medidas_seguranca || '');
                setNormaConformidade(projetoExistente.seguranca_conformidade?.normas_conformidade || '');
            } catch (error) {
                console.error('Erro ao carregar dados do projeto:', error);
            }
        }
    }, [projetoExistente, modoEdicao]);

    const handleSave = async () => {
        try {
            const formData = {
                informacoes_gerais: {
                    nome_projeto: nomeProjeto,
                    descricao_resumida: descricaoResumida,
                    data_preenchimento: dataPreenchimento,
                    responsavel: {
                        nome: nomeResponsavelPreenchimento,
                        cargo: cargoResponsavelPreenchimento,
                        telefone: telefoneResponsavelPreenchimento,
                        email: emailResponsavelPreenchimento
                    }
                },
                status_desenvolvimento: {
                    data_inicial: dataInicial,
                    data_final: dataFinal,
                    status_atual: status
                },
                tecnologias_utilizadas: {
                    frontend: frontend,
                    backend: tecnologiasBackend,
                    banco_dados: tecnologiasBancoDeDados,
                    apis: tecnologiasAPIs
                },
                metodologia: {
                    metodologia_aplicada: qualMetodologiaAplicada
                },
                testes_qualidade: {
                    passou_por_testes: passouPorTestes,
                    tipos_testes: quaisTestes
                },
                ambiente_implementacao: {
                    deploy_automatizado: deployAutomatizado,
                    deploy_estruturado: deployEstruturado,
                    implementado: implementado,
                    ambiente_implementado: foiImplementadoQual,
                    rollback_automatico: rollbackAutomatico
                },
                documentacao: {
                    possui_documentacao: documentacaoTecnica,
                    tipos_documentos: selectedOptions,
                    outros_documentos: outrosDocumentosTecnicos,
                    documentacao_atualizada: docAtualizado
                },
                equipe_suporte: {
                    lider_tecnico: nomeLiderTecnico,
                    gerente_projeto: nomeGerenteProjeto,
                    responsavel_suporte: nomeResponsavelSuporte,
                    suporte_disponivel: existeSuporteTecnicoDisponivel,
                    horario_suporte: horarioSuporte
                },
                seguranca_conformidade: {
                    medidas_seguranca: formaImplementacaoMedidaSeguranca,
                    normas_conformidade: normaConformidade
                }
            };
    
            const url = modoEdicao 
                ? `http://localhost:3333/api/projetos/${projetoExistente.id}`
                : 'http://localhost:3333/api/projetos';
    
            const method = modoEdicao ? 'PUT' : 'POST';
    
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                const data = await response.json();
                adicionarProjeto(data);
                alert(modoEdicao ? 'Projeto atualizado com sucesso!' : 'Projeto salvo com sucesso!');
                fecharModal();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao salvar o projeto');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert(error.message || 'Erro ao salvar os dados');
        }
    };

    const lidarComEnvio = async (evento) => {
        evento.preventDefault();
        try {
            await handleSave();
        } catch (error) {
            console.error('Erro ao salvar:', error);
        }
    }

    const sairAoClicarForaDoModal = (evento) => {
        if(evento.target === evento.currentTarget){
            fecharModal()
        }
    }

    return(
        <div className={styles.containerModal} onClick={sairAoClicarForaDoModal}>
            <div className={styles.modal}>
                <h2>{modoEdicao ? 'Editar Projeto' : 'Adicionar Projeto'}</h2>
                <form onSubmit={lidarComEnvio}>
                    <fieldset>
                        <legend>Informações do Projeto</legend>
                        <FieldsetInfoGerais
                            nomeProjeto={nomeProjeto}
                            setNomeProjeto={setNomeProjeto}
                            descricaoResumida={descricaoResumida}
                            setDescricaoResumida={setDescricaoResumida}
                            dataPreenchimento={dataPreenchimento}
                            setDataPreenchimento={setDataPreenchimento}
                            nomeResponsavelPreenchimento={nomeResponsavelPreenchimento}
                            setNomeResponsavelPreenchimento={setNomeResponsavelPreenchimento}
                            cargoResponsavelPreenchimento={cargoResponsavelPreenchimento}
                            setCargoResponsavelPreenchimento={setCargoResponsavelPreenchimento}
                            telefoneResponsavelPreenchimento={telefoneResponsavelPreenchimento}
                            setTelefoneResponsavelPreenchimento={setTelefoneResponsavelPreenchimento}
                            emailResponsavelPreenchimento={emailResponsavelPreenchimento}
                            setEmailResponsavelPreenchimento={setEmailResponsavelPreenchimento}
                        />
                        <FieldsetStatusDesen
                            dataInicial={dataInicial}
                            setDataInicial={setDataInicial}
                            dataFinal={dataFinal}
                            setDataFinal={setDataFinal}
                            status={status}
                            setStatus={setStatus}
                        />
                        <FieldSetTecUtili
                            frontend={frontend}
                            setFrontend={setFrontend}
                            tecnologiasBackend={tecnologiasBackend}
                            setTecnologiasBackend={setTecnologiasBackend}
                            tecnologiasBancoDeDados={tecnologiasBancoDeDados}
                            setTecnologiasBancoDeDados={setTecnologiasBancoDeDados}
                            tecnologiasAPIs={tecnologiasAPIs}
                            setTecnologiasAPIs={setTecnologiasAPIs}
                        />
                        <FieldsetMetodologiaAplicada
                            qualMetodologiaAplicada={qualMetodologiaAplicada}
                            setQualMetodologiaAplicada={setQualMetodologiaAplicada}
                        />
                        <FieldsetTestesEQualidade
                            passouPorTestes={passouPorTestes}
                            setPassouPorTestes={setPassouPorTestes}
                            quaisTestes={quaisTestes}
                            setQuaisTestes={setQuaisTestes}
                        />
                        <FieldsetAmbienteImplem
                            deployAutomatizado={deployAutomatizado}
                            setDeployAutomatizado={setDeployAutomatizado}
                            deployEstruturado={deployEstruturado}
                            setDeployEstruturado={setDeployEstruturado}
                            implementado={implementado}
                            setImplementado={setImplementado}
                            rollbackAutomatico={rollbackAutomatico}
                            setRollbackAutomatico={setRollbackAutomatico}
                        foiImplementadoQual={foiImplementadoQual}
                        setFoiImplementadoQual={setFoiImplementadoQual}
                        />
                        <FieldsetDocumentacao
                        documentacaoTecnica={documentacaoTecnica}
                        setDocumentacaoTecnica={setDocumentacaoTecnica}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        outrosDocumentosTecnicos={outrosDocumentosTecnicos}
                        setOutrosDocumentosTecnicos={setOutrosDocumentosTecnicos}
                        docAtualizado={docAtualizado}
                        setDocAtualizado={setDocAtualizado}
                        />
                        <FieldsetEquipeESuporte
                        nomeLiderTecnico={nomeLiderTecnico}
                        setNomeLiderTecnico={setNomeLiderTecnico}
                        nomeGerenteProjeto={nomeGerenteProjeto}
                        setNomeGerenteProjeto={setNomeGerenteProjeto}
                        nomeResponsavelSuporte={nomeResponsavelSuporte}
                        setNomeResponsavelSuporte={setNomeResponsavelSuporte}
                        existeSuporteTecnicoDisponivel={existeSuporteTecnicoDisponivel}
                        setExisteSuporteTecnicoDisponivel={setExisteSuporteTecnicoDisponivel}
                        horarioSuporte={horarioSuporte}
                        setHorarioSuporte={setHorarioSuporte}
                        />
                        <FieldsetSegurancaEConformidade
                        formaImplementacaoMedidaSeguranca={formaImplementacaoMedidaSeguranca}
                        setFormaImplementacaoMedidaSeguranca={setFormaImplementacaoMedidaSeguranca}
                        normaConformidade={normaConformidade}
                        setNormaConformidade={setNormaConformidade}
                        />
                    </fieldset>
                    <div className={styles.containerBotoesModal}>
                        <button
                            type="button"
                            onClick={fecharModal}
                        >Cancelar</button>
                        <button
                            type="button"
                            onClick={handleSave}
                        >Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalProjeto