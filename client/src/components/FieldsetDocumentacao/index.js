
/* Importando o CSS utilizando o SCSS */
import styles from "./FieldsetDocumentacao.module.css"

/* Importando os componentes */
import SelectDocumentacaoTecnica from "../SelectDocumentacaoTecnica";
import SelectDocAtualizado from "../SelectDocAtuali";


const FieldsetDocumentacao = () => {
    
    return(
        <fieldset className={styles.containerFieldsetDocumentacao}>
            <legend>Documentação</legend>
            <SelectDocumentacaoTecnica/>
            <SelectDocAtualizado/>
            
        </fieldset>
    )
}

export default FieldsetDocumentacao