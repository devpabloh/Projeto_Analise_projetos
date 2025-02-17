
/* Importando o CSS utilizando o SCSS */
import styles from "./SelectDocAtuali.module.css"


const SelectDocAtuali = ({docAtualizado, setDocAtualizado}) => {
    

    return(
        <div className={styles.containerSelectDocAtuali}>
        <label htmlFor="docAtualizado">A documentação está atualizada?</label>
        <select name="docAtualizado" id="docAtualizado" value={docAtualizado} onChange={(evento)=> setDocAtualizado(evento.target.value)} required>
            <option value="" disabled >Selecione uma opção</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
            <option value="parcialmente">Parcialmente</option>
        </select>
    </div>
    )
}

export default SelectDocAtuali