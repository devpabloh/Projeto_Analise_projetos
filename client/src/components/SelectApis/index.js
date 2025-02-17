

const SelectApis = ({
    tecnologiasAPIs,
    setTecnologiasAPIs
}) => {
    
    
    const ObjetoTecnologiasAPIs = [
        { value: "apiRest", label: "APIs Rest" },
        {value: "apiSoap", label: "APIs Soap"},
        {value: "apiGraphQL", label: "APIs GraphQL"},
        {value: "apigRPC", label: "APIs gRPC"},
        {value: "apiWebSocket", label: "APIs WebSocket"},
        {value: "apiWebhooks", label: "APIs Webhooks"}
    ];

    return(
        <div>
            <label htmlFor="tecnologiasAPIs">APIs</label>
            <select name="tecnologiasAPIs" id="tecnologiasAPIs" value={tecnologiasAPIs} onChange={(evento)=> setTecnologiasAPIs(evento.target.value)} required>
                <option value="" disabled>Selecione uma opção</option>
                {ObjetoTecnologiasAPIs.map((api)=>(
                    <option key={api.value} value={api.value}>{api.label}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectApis