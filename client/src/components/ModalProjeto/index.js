
import styles from './ModalProjeto.module.css'
import FieldsetInfoGerais from "../FieldsetInfoGerais";
import FieldsetStatusDesen from '../FieldsetStatusDesen';
import FieldSetTecUtili from "../FieldsetTecUtili";

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
                    </fieldset>
                    <div>
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