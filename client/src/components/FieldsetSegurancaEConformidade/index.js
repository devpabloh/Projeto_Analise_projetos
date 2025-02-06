
/* Importando o CSS utilizando o SCSS */
import styles from "./FieldsetSegurancaEConformidade.module.css"

/* importando os componentes */
import SelectForamImplemMedidSegu from "../SelectForamImplemMedidSegu"
import SelectNormaConformidade from "../SelectNormaConformidade"

const FieldsetSegurancaEConformidade = () => {
    return(
        <fieldset className={styles.containerFieldsetSegurancaEConformidade}>
            <legend>Seguranca e conformidade</legend>
            <SelectForamImplemMedidSegu/>
            <SelectNormaConformidade/>
        </fieldset>
    )
}

export default FieldsetSegurancaEConformidade