import { useState } from "react";

const FieldsetMetodologiaAplicada = () => {
    
    const [metodologiaAplicada, setMetodologiaAplicada] = useState([]);

    const ObjetoMetodologiaAplicada = [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "angular", label: "Angular" },
        { value: "svelte", label: "Svelte" },
        { value: "html", label: "HTML" },
        { value: "css", label: "CSS" }
    ];
    return (
        <fieldset>
            <legend>Metodologia aplicada</legend>
            <div>
            <label>Qual a metodologia aplicada?</label>
            <select name="metodologiaAplicada" value={metodologiaAplicada} onChange={(evento)=> setMetodologiaAplicada(evento.target.value)} required>
                <option value="" disabled>Selecione o status</option>
                {ObjetoMetodologiaAplicada.map((metodologia) => (
                    <option key={metodologia.value} value={metodologia.value}>
                        {metodologia.label}
                    </option>
                ))}
            </select>
            </div>
            
        </fieldset>
    )
}

export default FieldsetMetodologiaAplicada