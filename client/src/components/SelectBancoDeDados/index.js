import {useState} from "react";

const SelectBancoDeDados = () => {
    const [tecnologiasBancoDeDados, setTecnologiasBancoDeDados] = useState('');

    const ObjetoTecnologiasBancoDeDados = [
        { value: "mySql", label: "MySQL" },
        { value: "SqlLite", label: "SQLite" },
        { value: "postgreSql", label: "PostgreSQL" },
        { value: "sqlServer", label: "SQL Server" },
        { value: "mongoDb", label: "MongoDB" },
        { value: "oracle", label: "Oracle" },
    ];

    return (
        <div>
            <label htmlFor="bancoDeDados">Banco de dados</label>
            <select name="bancoDeDados" id="bancoDeDados" value={tecnologiasBancoDeDados} onChange={(evento)=> setTecnologiasBancoDeDados(evento.target.value)} required>
                <option value="" disabled>Selecione uma opção</option>
                {ObjetoTecnologiasBancoDeDados.map((tecnologia) => (
                    <option key={tecnologia.value} value={tecnologia.value}>
                        {tecnologia.label}
                    </option>
            ))}
            </select>
        </div>
    )
}

export default SelectBancoDeDados