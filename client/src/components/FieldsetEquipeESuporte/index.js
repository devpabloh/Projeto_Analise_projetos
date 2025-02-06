import { useState } from "react"


import SelectSuporteTecnDispo from "../SelectSuporteTecnDispo"
import SelectHorarioSuporte from "../SelectHorarioSuporte"

/* importando o css */
import styles from "./FieldsetEquipeESuporte.module.css"

const FieldsetEquipeESuporte = () => {
    const [nomeLiderTecnico, setNomeLiderTecnico] = useState('');
    const [nomeGerenteProjeto, setNomeGerenteProjeto] = useState('');
    const [nomeResponsavelSuporte, setNomeResponsavelSuporte] = useState('');

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
            <SelectSuporteTecnDispo/>
            <SelectHorarioSuporte/>
        </fieldset>
    )
}

export default FieldsetEquipeESuporte