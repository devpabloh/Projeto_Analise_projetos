import SelectSuporteTecnDispo from "../SelectSuporteTecnDispo"
import SelectHorarioSuporte from "../SelectHorarioSuporte"
import styles from "./FieldsetEquipeESuporte.module.css"

const FieldsetEquipeESuporte = ({
    nomeLiderTecnico = '',
    setNomeLiderTecnico,
    nomeGerenteProjeto = '',
    setNomeGerenteProjeto,
    nomeResponsavelSuporte = '',
    setNomeResponsavelSuporte,
    existeSuporteTecnicoDisponivel = '', 
    setExisteSuporteTecnicoDisponivel,
    horarioSuporte = '', 
    setHorarioSuporte
}) => {
    // Handler functions for input changes
    const handleInputChange = (setter) => (event) => {
        if (typeof setter === 'function') {
            setter(event.target.value);
        }
    };

    return (
        <fieldset className={styles.containerFieldsetEquipeESuporte}>
            <legend>Equipe e suporte</legend>
            <div>
                <label htmlFor="nomeLiderTecnico">Nome do líder técnico</label>
                <input
                    type="text"
                    name="nomeLiderTecnico"
                    id="nomeLiderTecnico"
                    value={nomeLiderTecnico}
                    onInput={handleInputChange(setNomeLiderTecnico)}
                    required
                />
            </div>
            <div>
                <label htmlFor="nomeGerenteProjeto">Nome do gerente de projeto</label>
                <input
                    type="text"
                    name="nomeGerenteProjeto"
                    id="nomeGerenteProjeto"
                    value={nomeGerenteProjeto}
                    onInput={handleInputChange(setNomeGerenteProjeto)}
                    required
                />
            </div>
            <div>
                <label htmlFor="nomeResponsavelSuporte">Nome do responsável de suporte</label>
                <input
                    type="text"
                    name="nomeResponsavelSuporte"
                    id="nomeResponsavelSuporte"
                    value={nomeResponsavelSuporte}
                    onInput={handleInputChange(setNomeResponsavelSuporte)}
                    required
                />
            </div>
            <SelectSuporteTecnDispo
                existeSuporteTecnicoDisponivel={existeSuporteTecnicoDisponivel}
                setExisteSuporteTecnicoDisponivel={setExisteSuporteTecnicoDisponivel}
            />
            <SelectHorarioSuporte
                horarioSuporte={horarioSuporte}
                setHorarioSuporte={setHorarioSuporte}
            />
        </fieldset>
    )
}

export default FieldsetEquipeESuporte