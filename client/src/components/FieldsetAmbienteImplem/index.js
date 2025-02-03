import SelectImplementado from "../SelectImplementado";
import SelectDeployEstruturado from "../SelectDeployEstruturado";
import SelectDeployAutomatizado from "../SelectDeployAutomatizado";
import SelectRollbackAutomatico from "../SelectRollbackAutomatico";

const FieldsetAmbienteImplem = ()=>{
    return(
        <fieldset>
            <legend>Ambiente e implementação</legend>
            <SelectImplementado/>
            <SelectDeployEstruturado/>
            <SelectDeployAutomatizado/>
            <SelectRollbackAutomatico/>

            
        </fieldset>
    )
}

export default FieldsetAmbienteImplem