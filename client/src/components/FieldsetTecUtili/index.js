
import SelectApis from "../SelectApis";
import SelectBackend from "../SelectBackend";
import SelectBancoDeDados from "../SelectBancoDeDados";
import SelectFrontend from "../SelectFrontend";
import styles from "./FieldsetTecUtili.module.css";

const FieldSetTecUtili = ({
    frontend,
    setFrontend,
    tecnologiasBackend,
    setTecnologiasBackend,
    tecnologiasBancoDeDados,
    setTecnologiasBancoDeDados,
    tecnologiasAPIs,
    setTecnologiasAPIs
}) => {

    

    return(
        <fieldset className={styles.containerFieldset}>
        <legend>Tecnologias utilizadas</legend>
        <SelectFrontend
        frontend={frontend}
        setFrontend={setFrontend}
        />
        <SelectBackend
        tecnologiasBackend={tecnologiasBackend}
        setTecnologiasBackend={setTecnologiasBackend}
        />
        <SelectBancoDeDados
        tecnologiasBancoDeDados={tecnologiasBancoDeDados}
        setTecnologiasBancoDeDados={setTecnologiasBancoDeDados}
        />
        <SelectApis
        tecnologiasAPIs={tecnologiasAPIs}
        setTecnologiasAPIs={setTecnologiasAPIs}
        />
        </fieldset>
    )
}

export default FieldSetTecUtili