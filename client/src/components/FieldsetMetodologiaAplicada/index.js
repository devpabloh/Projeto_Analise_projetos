
/* Importando o CSS utilizando o SCSS */
import styles from "./FieldsetMetodologiaAplicada.module.css"

import SelectQualMetodologiaAplicada from "../SelectQualMetodologiaAplicada"

const FieldsetMetodologiaAplicada = ({qualMetodologiaAplicada, 
    setQualMetodologiaAplicada}) => {

    return (
        <fieldset className={styles.containerFieldsetMetodologiaAplicada}>
            <legend>Metodologia aplicada</legend>
            <SelectQualMetodologiaAplicada
            qualMetodologiaAplicada={qualMetodologiaAplicada}
            setQualMetodologiaAplicada={setQualMetodologiaAplicada}
            />
            
        </fieldset>
    )
}

export default FieldsetMetodologiaAplicada