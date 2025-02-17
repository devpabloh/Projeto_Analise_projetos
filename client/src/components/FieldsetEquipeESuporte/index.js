
import SelectSuporteTecnDispo from "../SelectSuporteTecnDispo"
import SelectHorarioSuporte from "../SelectHorarioSuporte"

/* importando o css */
import styles from "./FieldsetEquipeESuporte.module.css"

const FieldsetEquipeESuporte = ({
    nomeLiderTecnico,
    setNomeLiderTecnico,
    nomeGerenteProjeto,
    setNomeGerenteProjeto,
    nomeResponsavelSuporte,
    setNomeResponsavelSuporte,
    existeSuporteTecnicoDisponivel, 
    setExisteSuporteTecnicoDisponivel,
    horarioSuporte, 
    setHorarioSuporte
}) => {
    

    return(
        <fieldset className={styles.containerFieldsetEquipeESuporte}>
            <legend>Equipe e suporte</legend>
            <div>
                <label htmlFor="nomeLiderTecnico">Nome do líder técnico</label>
                    <input
                    type="text"
                    name="nomeLiderTecnico"
                    id="nomeLiderTecnico"
                    value={nomeLiderTecnico}
                    onChange={(evento) => setNomeLiderTecnico(evento.target.value)}
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
                    onChange={(evento) => setNomeGerenteProjeto(evento.target.value)}
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
                    onChange={(evento) => setNomeResponsavelSuporte(evento.target.value)}
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