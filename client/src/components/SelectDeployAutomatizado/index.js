
/*  importando os hooks */
import {useState} from "react"

import styles from "./SelectDeployAutomatizado.module.css"

const SelectDeployAutomatizado = () => {
    const [deployAutomatizado, setDeployAutomatizado] = useState('')
    return(
        <div className={styles.containerSelectDeployAutomatizado}>
            <label htmlFor="deployAutomatizado">A implantação é feita de forma automatizada CI/CD?</label>
            <select name="deployAutomatizado" id="deployAutomatizado" value={deployAutomatizado} onChange={(evento)=> setDeployAutomatizado(evento.target.value)}  required>
                <option value="" disabled selected >Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
                <option value="parcialmente">Parcialmente</option>
            </select>
            
        </div>
    )
}

export default SelectDeployAutomatizado