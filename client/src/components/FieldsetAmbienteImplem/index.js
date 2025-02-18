
/* Importando o CSS utilizando o SCSS */
import styles from "./FieldsetAmbienteImplem.module.css"

/* Importando os componentes */
import SelectImplementado from "../SelectImplementado";
import SelectDeployEstruturado from "../SelectDeployEstruturado";
import SelectDeployAutomatizado from "../SelectDeployAutomatizado";
import SelectRollbackAutomatico from "../SelectRollbackAutomatico";

const FieldsetAmbienteImplem = ({
    deployEstruturado,
    setDeployEstruturado,
    deployAutomatizado, 
    setDeployAutomatizado,
    rollbackAutomatico,
    setRollbackAutomatico,
    implementado,
    setImplementado,
    foiImplementadoQual, 
    setFoiImplementadoQual
    })=>{
    return(
        <fieldset className={styles.containerFieldsetAmbienteImplem}>
            <legend>Ambiente e implementação</legend>
            <SelectDeployEstruturado
            deployEstruturado={deployEstruturado}
            setDeployEstruturado={setDeployEstruturado}
            />
            <SelectDeployAutomatizado
            deployAutomatizado={deployAutomatizado}
            setDeployAutomatizado={setDeployAutomatizado}
            />
            <SelectRollbackAutomatico
            rollbackAutomatico={rollbackAutomatico}
            setRollbackAutomatico={setRollbackAutomatico}
            />
            <SelectImplementado
            implementado={implementado}
            setImplementado={setImplementado}
            foiImplementadoQual={foiImplementadoQual}
            setFoiImplementadoQual={setFoiImplementadoQual}
            />
        </fieldset>
    )
}

export default FieldsetAmbienteImplem