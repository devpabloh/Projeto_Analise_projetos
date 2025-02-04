import SelectDocumentacaoTecnica from "../SelectDocumentacaoTecnica";
import SelectDocAtualizado from "../SelectDocAtuali";


const FieldsetDocumentacao = () => {
    
    return(
        <fieldset>
            <legend>Documentação</legend>
            <SelectDocumentacaoTecnica/>
            <SelectDocAtualizado/>
            
        </fieldset>
    )
}

export default FieldsetDocumentacao