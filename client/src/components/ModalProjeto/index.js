/* importando CSS */
import styles from './ModalProjeto.module.css'

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
    

    const lidarComEnvio = (evento)=>{
        evento.preventDefault();
        fecharModal()
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
                        <FieldsetInfoGerais/>
                        <FieldsetStatusDesen/>
                        <FieldSetTecUtili/>
                        <FieldsetMetodologiaAplicada/>
                        <FieldsetTestesEQualidade/>
                        <FieldsetAmbienteImplem/>
                        <FieldsetDocumentacao/>
                        <FieldsetEquipeESuporte/>
                        <FieldsetSegurancaEConformidade/>
                    </fieldset>
                    <div className={styles.containerBotoesModal}>
                        <button
                            type="button"
                            onClick={()=> fecharModal()}
                        >Cancelar</button>
                        <button
                            type="button"
                        >Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalProjeto