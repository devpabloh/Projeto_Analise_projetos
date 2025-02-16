
/* Importando o CSS utilizando o SCSS */
import styles from "./FieldsetSegurancaEConformidade.module.css"

/* importando os componentes */
import SelectForamImplemMedidSegu from "../SelectForamImplemMedidSegu"
import SelectNormaConformidade from "../SelectNormaConformidade"

const FieldsetSegurancaEConformidade = ({
    formaImplementacaoMedidaSeguranca,
    setFormaImplementacaoMedidaSeguranca,
    normaConformidade, 
    setNormaConformidade
}) => {
    return(
        <fieldset className={styles.containerFieldsetSegurancaEConformidade}>
            <legend>Seguranca e conformidade</legend>
            <SelectForamImplemMedidSegu
            formaImplementacaoMedidaSeguranca={formaImplementacaoMedidaSeguranca}
            setFormaImplementacaoMedidaSeguranca={setFormaImplementacaoMedidaSeguranca}
            />
            <SelectNormaConformidade
            normaConformidade={normaConformidade}
            setNormaConformidade={setNormaConformidade}
            />
        </fieldset>
    )
}

export default FieldsetSegurancaEConformidade