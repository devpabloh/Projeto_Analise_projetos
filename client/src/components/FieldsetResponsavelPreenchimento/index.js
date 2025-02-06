/* Importando o CSS utilizando o SCSS */
import styles from "./FieldsetResponsavelPreenchimento.module.css"

/* Importando os componentes */
import InputResponsavelPreenchimento from "../InputResponsavelPreenchimento"

const FieldsetResponsavelPreenchimento = () => {
    return (
        <fieldset className={styles.containerFieldsetResponsavel}>
            <legend> Responsável pelo preenchimento</legend>
            <InputResponsavelPreenchimento/>
        </fieldset>
    )
}

export default FieldsetResponsavelPreenchimento