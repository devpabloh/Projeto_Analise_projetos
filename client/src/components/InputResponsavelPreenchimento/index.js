/* importando os hooks */
import styles from "./InputResponsavelPreenchimento.module.css"

const InputResponsavelPreenchimento = ({
    nomeResponsavelPreenchimento,
    setNomeResponsavelPreenchimento,
    cargoResponsavelPreenchimento,
    setCargoResponsavelPreenchimento,
    telefoneResponsavelPreenchimento,
    setTelefoneResponsavelPreenchimento,
    emailResponsavelPreenchimento,
    setEmailResponsavelPreenchimento,
} )=>{

    return(
        <div className={styles.containerInputResponsavelPreenchimento}>
            <div>
                <label htmlFor="nomeResponsavelPreenchimento">Nome do responsável</label>
                <input
                type="text"
                name="nomeResponsavelPreenchimento"
                id="nomeResponsavelPreenchimento"
                value={nomeResponsavelPreenchimento}
                onChange={(evento) => setNomeResponsavelPreenchimento(evento.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor="cargoResponsavelPreenchimento">Cargo</label>
                <input
                type="text"
                name="cargoResponsavelPreenchimento"
                id="cargoResponsavelPreenchimento"
                value={cargoResponsavelPreenchimento}
                onChange={(evento) => setCargoResponsavelPreenchimento(evento.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor="telefoneResponsavelPreenchimento">Telefone</label>
                <input
                type="tel"
                name="telefoneResponsavelPreenchimento"
                id="telefoneResponsavelPreenchimento"
                value={telefoneResponsavelPreenchimento}
                onChange={(evento) => setTelefoneResponsavelPreenchimento(evento.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor="emailResponsavelPreenchimento">E-mail</label>
                <input
                type="email"
                name="emailResponsavelPreenchimento"
                id="emailResponsavelPreenchimento"
                value={emailResponsavelPreenchimento}
                onChange={(evento) => setEmailResponsavelPreenchimento(evento.target.value)}
                required
                />
            </div>
        </div>
    )
}

export default InputResponsavelPreenchimento