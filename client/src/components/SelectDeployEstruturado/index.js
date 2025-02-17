
/* Importando o CSS utilizando o SCSS */
import styles from "./SelectDeployEstruturado.module.css"

const SelectDeployEstruturado = ({deployEstruturado, setDeployEstruturado}) => {
    
    return(
        <div className={styles.containerSelectDeployEstruturado}>
            <label htmlFor="deployEstruturado">Existe um processo estruturado de deploy?</label>
            <select name="deployEstruturado" id="deployEstruturado" value={deployEstruturado} onChange={(evento)=> setDeployEstruturado(evento.target.value)}  required>
                <option value="" disabled selected >Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
            
        </div>
    )
}

export default SelectDeployEstruturado