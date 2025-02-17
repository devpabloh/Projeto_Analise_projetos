import styles from "./SelectFoiImplementado.module.css"

const SelectFoiImplementado = ({ foiImplementadoQual, onChange }) => {
    return(
        <div className={styles.containerSelectFoiImplementado}>
            <label htmlFor="foiImplementadoQual">O projeto foi implementado em algum ambiente?</label>
            <select 
                name="foiImplementadoQual" 
                id="foiImplementadoQual" 
                value={foiImplementadoQual} 
                onChange={(evento) => onChange(evento.target.value)}  
                required
            >
                <option value="" disabled>Selecione uma opção</option>
                <option value="AmbienteDeDesenvolvimento">Ambiente de desenvolvimento</option>
                <option value="AmbienteDeHomologacao">Ambiente de homologação</option>
                <option value="AmbienteDeProducao">Ambiente de produção</option>
            </select>
        </div>
    )
}

export default SelectFoiImplementado