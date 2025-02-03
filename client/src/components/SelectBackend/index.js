import { useState } from "react";

const SelectBackend = () => {
    const [tecnologiasBackend, setTecnologiasBackend] = useState([]);

    const ObjetoTecnologiasBackend = [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "angular", label: "Angular" },
        { value: "svelte", label: "Svelte" },
        { value: "html", label: "HTML" },
        { value: "css", label: "CSS" }
    ];

    return (
        <div>
        <label>Back-end</label>
        <select name="backend" value={tecnologiasBackend} onChange={(evento)=> setTecnologiasBackend(evento.target.value)} required>
            <option value="" disabled>Selecione o status</option>
            {ObjetoTecnologiasBackend.map((tecnologia) => (
                <option key={tecnologia.value} value={tecnologia.value}>
                </option>
            ))}
        </select>
    </div>
    )
}

export default SelectBackend