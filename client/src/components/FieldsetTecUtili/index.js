
import SelectApis from "../SelectApis";
import SelectBackend from "../SelectBackend";
import SelectBancoDeDados from "../SelectBancoDeDados";
import SelectFrontend from "../SelectFrontend";
import styles from "./FieldsetTecUtili.module.css";

const FieldSetTecUtili = () => {

    

    return(
        <fieldset className={styles.containerFieldset}>
        <legend>Tecnologias utilizadas</legend>
        <SelectFrontend/>
        <SelectBackend/>
        <SelectBancoDeDados/>
        <SelectApis/>
        </fieldset>
    )
}

export default FieldSetTecUtili