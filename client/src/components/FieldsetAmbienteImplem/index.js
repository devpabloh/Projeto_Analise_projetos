
/* Importando o CSS utilizando o SCSS */
import styles from "./FieldsetAmbienteImplem.module.css"

/* Importando os componentes */
import SelectImplementado from "../SelectImplementado";
import SelectDeployEstruturado from "../SelectDeployEstruturado";
import SelectDeployAutomatizado from "../SelectDeployAutomatizado";
import SelectRollbackAutomatico from "../SelectRollbackAutomatico";

const FieldsetAmbienteImplem = ()=>{
    return(
        <fieldset className={styles.containerFieldsetAmbienteImplem}>
            <legend>Ambiente e implementação</legend>
            <SelectDeployEstruturado/>
            <SelectDeployAutomatizado/>
            <SelectRollbackAutomatico/>
            <SelectImplementado/>
        </fieldset>
    )
}

export default FieldsetAmbienteImplem