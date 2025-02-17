/* Importando o CSS utilizando o SCSS */
import styles from "./FieldsetResponsavelPreenchimento.module.css"

/* Importando os componentes */
import InputResponsavelPreenchimento from "../InputResponsavelPreenchimento"

const FieldsetResponsavelPreenchimento = ({
    nomeResponsavel,
    setNomeResponsavel,
    cargoResponsavel,
    setCargoResponsavel,
    telefoneResponsavel,
    setTelefoneResponsavel,
    emailResponsavel,
    setEmailResponsavel
}) => {
    return (
        <fieldset className={styles.containerFieldsetResponsavel}>
            <legend> Responsável pelo preenchimento</legend>
            <InputResponsavelPreenchimento
            nomeResponsavelPreenchimento={nomeResponsavel}
            setNomeResponsavelPreenchimento={setNomeResponsavel}
            cargoResponsavelPreenchimento={cargoResponsavel}
            setCargoResponsavelPreenchimento={setCargoResponsavel}
            telefoneResponsavelPreenchimento={telefoneResponsavel}
            setTelefoneResponsavelPreenchimento={setTelefoneResponsavel}
            emailResponsavelPreenchimento={emailResponsavel}
            setEmailResponsavelPreenchimento={setEmailResponsavel}
            />
        </fieldset>
    )
}

export default FieldsetResponsavelPreenchimento