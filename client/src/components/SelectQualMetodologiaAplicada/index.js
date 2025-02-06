/* importando os hooks */
import { useState } from "react";

/* Importando o CSS utilizando o SCSS */
import styles from "./SelectQualMetodologiaAplicada.module.css"

const SelectQualMetodologiaAplicada = () => {
    const [qualMetodologiaAplicada, setQualMetodologiaAplicada] = useState("");

    const ObjetoMetodologiaAplicada = [
        { value: "agil", label: "Ágil" },
        { value: "scrum", label: "Scrum" },
        { value: "kanban", label: "Kanban" },
        { value: "cascata", label: "Cascata" },
        { value: "extremeProgramming", label: "Extreme Programming (XP)" },
        { value: "leanDevelopment", label: "Lean Development" },
        { value: "tdd", label: "TDD (Test-Driven Development)" },
    ];

    return(
        <div className={styles.containerSelectQualMetodologiaAplicada}>
        <label htmlFor="metodologiaAplicada">Qual a metodologia aplicada?</label>
        <select name="metodologiaAplicada" id="metodologiaAplicada" value={qualMetodologiaAplicada} onChange={(evento)=> setQualMetodologiaAplicada(evento.target.value)} required>
            <option value="" disabled>Selecione uma opção</option>
            {ObjetoMetodologiaAplicada.map((metodologia) => (
                <option key={metodologia.value} value={metodologia.value}>
                    {metodologia.label}
                </option>
            ))}
        </select>
        </div>
    )
}

export default SelectQualMetodologiaAplicada