const SelectHorarioSuporte = ({ horarioSuporte, setHorarioSuporte }) => {
    const handleChange = (e) => {
        if (typeof setHorarioSuporte === 'function') {
            setHorarioSuporte(e.target.value);
        }
    };

    return(
        <div>
            <label htmlFor="horarioSuporte">Qual horário o suporte está disponível?</label>
            <select 
                name="horarioSuporte" 
                id="horarioSuporte" 
                value={horarioSuporte || ''} 
                onChange={handleChange}
                required
            >
                <option value="" disabled>Selecione uma opção</option>
                <option value="horarioComercial">Horário comercial</option>
                <option value="vinteEQuatroPorSete">24 por 7</option>
                <option value="apenasEmHorarioCritico">Apenas em horário crítico</option>
            </select>
        </div>
    )
}

export default SelectHorarioSuporte