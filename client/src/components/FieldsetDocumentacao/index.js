
/* Importando o CSS utilizando o SCSS */
import styles from "./FieldsetDocumentacao.module.css"

/* Importando os componentes */
import SelectDocumentacaoTecnica from "../SelectDocumentacaoTecnica";
import SelectDocAtualizado from "../SelectDocAtuali";


const FieldsetDocumentacao = ({
    documentacaoTecnica,
    setDocumentacaoTecnica,
    selectedOptions, 
    setSelectedOptions,
    outrosDocumentosTecnicos, 
    setOutrosDocumentosTecnicos,
    docAtualizado, 
    setDocAtualizado
}) => {
    
    return(
        <fieldset className={styles.containerFieldsetDocumentacao}>
            <legend>Documentação</legend>
            <SelectDocumentacaoTecnica
            documentacaoTecnica={documentacaoTecnica}
            setDocumentacaoTecnica={setDocumentacaoTecnica}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            outrosDocumentosTecnicos={outrosDocumentosTecnicos}
            setOutrosDocumentosTecnicos={setOutrosDocumentosTecnicos}
            />
            <SelectDocAtualizado
            docAtualizado={docAtualizado}
            setDocAtualizado={setDocAtualizado}
            />
            
        </fieldset>
    )
}

export default FieldsetDocumentacao