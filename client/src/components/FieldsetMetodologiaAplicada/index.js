
/* Importando o CSS utilizando o SCSS */
import styles from "./FieldsetMetodologiaAplicada.module.css"

import SelectQualMetodologiaAplicada from "../SelectQualMetodologiaAplicada"

const FieldsetMetodologiaAplicada = () => {

    return (
        <fieldset className={styles.containerFieldsetMetodologiaAplicada}>
            <legend>Metodologia aplicada</legend>
            <SelectQualMetodologiaAplicada/>
            
        </fieldset>
    )
}

export default FieldsetMetodologiaAplicada