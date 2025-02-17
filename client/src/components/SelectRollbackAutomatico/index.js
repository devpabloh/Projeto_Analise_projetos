
/* Importando o CSS utilizando o SCSS */
import styles from "./SelectRollbackAutomatico.module.css"

const SelectRollbackAutomatico = ({
    rollbackAutomatico,
     setRollbackAutomatico
    })=>{

    return(
    <div className={styles.containerSelectRollbackAutomatico}>
        <label htmlFor="rollbackAutomatico">Existe rollback automático em caso de falha?</label>
        <select name="rollbackAutomatico" id="rollbackAutomatico" value={rollbackAutomatico} onChange={(evento)=> setRollbackAutomatico(evento.target.value)} required>
            <option value="" disabled selected>Selecione uma opção</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
        </select>
    </div>       
    )
}

export default SelectRollbackAutomatico