/* importando CSS */
import styles from './ModalProjeto.module.css'
import { useState } from 'react';

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

const ModalProjeto = ({fecharModal, adicionarProjeto}) => {

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
    
    
    const handleSave = async () => {
      try {
          const formData = {
              informacoes_gerais: {
                  nome_projeto: nomeProjeto,
                  descricao_resumida: descricaoResumida,
                  data_preenchimento: dataPreenchimento,
                  responsavel_preenchimento: {
                      nome: nomeResponsavelPreenchimento,
                      cargo: cargoResponsavelPreenchimento,
                      telefone: telefoneResponsavelPreenchimento,
                      email: emailResponsavelPreenchimento
                  }
              },
              status_desenvolvimento: {
                  data_inicial: dataInicial,
                  data_final: dataFinal,
                  status: status
              },
              tecnologias: {
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
                  quais_testes: quaisTestes
              },
              ambiente_implementacao: {
                  deploy_automatizado: deployAutomatizado,
                  deploy_estruturado: deployEstruturado,
                  implementado: implementado,
                  rollback_automatico: rollbackAutomatico
              },
              documentacao: {
                  documentacao_tecnica: documentacaoTecnica,
                  tipos_documentos: selectedOptions,
                  outros_documentos: outrosDocumentosTecnicos,
                  documentacao_atualizada: docAtualizado
              },
              equipe_suporte: {
                  lider_tecnico: nomeLiderTecnico,
                  gerente_projeto: nomeGerenteProjeto,
                  responsavel_suporte: nomeResponsavelSuporte,
                  suporte_tecnico_disponivel: existeSuporteTecnicoDisponivel,
                  horario_suporte: horarioSuporte
              },
              seguranca_conformidade: {
                  implementacao_medida_seguranca: formaImplementacaoMedidaSeguranca,
                  norma_conformidade: normaConformidade
              }
          };
      
          // Envia os dados para o backend
          const response = await fetch('http://localhost:3333/api/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
      
          if (response.ok) {
            alert('Dados salvos com sucesso!');
          } else {
            throw new Error('Erro ao salvar dados');
          }
        } catch (error) {
          console.error('Erro:', error);
          alert('Erro ao salvar os dados');
        }
      };
    

    const lidarComEnvio = async (evento) => {
        evento.preventDefault();
        try {
            await handleSave();
            fecharModal();
        } catch (error) {
            console.error('Erro ao salvar:', error);
        }
    }

    const sairAoClicarForaDoModal = (evento)=>{
        if(evento.target === evento.currentTarget){
            fecharModal()
        }
    }

    return(
        <div className={styles.containerModal} onClick={sairAoClicarForaDoModal}>
            <div className={styles.modal}>
                <h2>Adicionar Projeto</h2>
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