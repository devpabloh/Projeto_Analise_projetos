/* importando os hooks */
import { useState } from "react"

/* Importando o CSS utilizando o SCSS */
import styles from "./SelectImplementado.module.css"

/* Importando os componentes */
import SelectFoiImplementado from '../SelectFoiImplementado';


const SelectImplementado = ()=>{

    const [implementado, setImplementado] = useState('')

    return(
        <div className={styles.containerSelectImplementado}>
            <label htmlFor="implementado">O projeto foi implementado em algum ambiente?</label>
            <select name="implementado" id="implementado" value={implementado} onChange={(evento)=> setImplementado(evento.target.value)}  required>
                <option value="" disabled >Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
            {implementado === "sim" && <SelectFoiImplementado/>}
        </div>
    )
}

export default SelectImplementado