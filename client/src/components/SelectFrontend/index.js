import { useState } from "react";

const SelectFrontend = () => {
    const [frontend, setFrontend] = useState([]);

    const ObjetoTecnologiasFrontEnd = [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "angular", label: "Angular" },
        { value: "svelte", label: "Svelte" },
        { value: "html", label: "HTML" },
        { value: "css", label: "CSS" }
    ];

    return(
        <div>
            <label htmlFor="frontend">Front-end</label>
            <select name="frontend" id="frontend" value={frontend} onChange={(evento)=> setFrontend(evento.target.value)} required>
                <option value="" disabled>Selecione o status</option>
                {ObjetoTecnologiasFrontEnd.map((tecnologia) => (
                    <option key={tecnologia.value} value={tecnologia.value}>
                        {tecnologia.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectFrontend