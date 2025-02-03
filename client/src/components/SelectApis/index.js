import { useState } from "react"

const SelectApis = () => {
    const [tecnologiasAPIs, setTecnologiasAPIs] = useState('');
    const ObjetoTecnologiasAPIs = [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "angular", label: "Angular" },
        { value: "svelte", label: "Svelte" },
        { value: "html", label: "HTML" },
        { value: "css", label: "CSS" }
    ];

    return(
        <div>
            <label>APIs</label>
            <select name="tecnologiasAPIs" value={tecnologiasAPIs} onChange={(evento)=> setTecnologiasAPIs(evento.target.value)} required>
                <option value="" disabled>Selecione o status</option>
                {ObjetoTecnologiasAPIs.map((api)=>(
                    <option value={api.value}>{api.value}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectApis