
const SelectFrontend = ({frontend, setFrontend}) => {

    const ObjetoTecnologiasFrontEnd = [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "angular", label: "Angular" },
        { value: "svelte", label: "Svelte" },
        { value: "aspNetCoreMvc", label: "ASP.NET Core MVC" },
    ];

    return(
        <div>
            <label htmlFor="frontend">Front-end</label>
            <select name="frontend" id="frontend" value={frontend} onChange={(evento)=> setFrontend(evento.target.value)} required>
                <option value="" disabled>Selecione uma opção</option>
                {ObjetoTecnologiasFrontEnd.map((tecnologia) => (
                    <option key={tecnologia.value} value={tecnologia.value}>
                        {tecnologia.label}
                    </option>
                ))}
            </select>
            {console.log(typeof(frontend))}
        </div>
        
    )
}

export default SelectFrontend