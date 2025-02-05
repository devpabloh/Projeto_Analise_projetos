import SelectForamImplemMedidSegu from "../SelectForamImplemMedidSegu"
import SelectNormaConformidade from "../SelectNormaConformidade"

const FieldsetSegurancaEConformidade = () => {
    return(
        <fieldset>
            <legend>Seguranca e conformidade</legend>
            <SelectForamImplemMedidSegu/>
            <SelectNormaConformidade/>
           
            
        </fieldset>
    )
}

export default FieldsetSegurancaEConformidade