
/* importando componentes */
import SelectQuaisNormasConform from "../SelectQuaisNormasConform"

import styles from "./SelectNormaConformidade.module.css"

const SelectNormaConformidade = ({
    normaConformidade, 
    setNormaConformidade
}) => {
    const handleChange = (e) => {
        setNormaConformidade(e.target.value);
        console.log("Norma de conformidade selecionada:", e.target.value); 
    };

    return(
        <div className={styles.containerSelectNormaConformidade}>
            <label>Projeto atende alguma norma de conformidade?</label>
            <select name="normaConformidade" value={normaConformidade} onChange={(e)=> handleChange(e)}>
                <option value="" disabled selected  >Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
            {normaConformidade === "sim" && (
                <div>
                    <SelectQuaisNormasConform />
                </div>
            )}
        </div>
    )
}

export default SelectNormaConformidade