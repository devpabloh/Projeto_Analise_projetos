import {useState} from "react";

const SelectBancoDeDados = () => {
    const [tecnologiasBancoDeDados, setTecnologiasBancoDeDados] = useState('');

    const ObjetoTecnologiasBancoDeDados = [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "angular", label: "Angular" },
        { value: "svelte", label: "Svelte" },
        { value: "html", label: "HTML" },
        { value: "css", label: "CSS" }
    ];

    return (
        <div>
            <label>Banco de dados</label>
            <select name="bancoDeDados" value={tecnologiasBancoDeDados} onChange={(evento)=> setTecnologiasBancoDeDados(evento.target.value)} required>
                <option value="" disabled>Selecione o status</option>
                {ObjetoTecnologiasBancoDeDados.map((tecnologia) => (
                    <option key={tecnologia.value} value={tecnologia.value}>
                    </option>
            ))}
            </select>
        </div>
    )
}

export default SelectBancoDeDados