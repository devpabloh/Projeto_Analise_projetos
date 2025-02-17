

const SelectBackend = ({tecnologiasBackend, setTecnologiasBackend}) => {

    const ObjetoTecnologiasBackend = [
        { value: "nodeJs", label: "Node.js"},
        { value: "python", label: "Python" },
        { value: "C", label: "C#" },
        {value: "java", label: "Java" },
    ];

    return (
        <div>
        <label  htmlFor="backend">Back-end</label>
        <select name="backend" id="backend" value={tecnologiasBackend} onChange={(evento)=> setTecnologiasBackend(evento.target.value)} required>
            <option  value="" disabled>Selecione uma opção</option>
            {ObjetoTecnologiasBackend.map((tecnologia) => (
                <option key={tecnologia.value} value={tecnologia.value}>
                {tecnologia.label}
                </option>
            ))}
        </select>
    </div>
    )
}

export default SelectBackend