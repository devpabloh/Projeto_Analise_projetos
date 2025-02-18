const SelectSuporteTecnDispo = ({
    existeSuporteTecnicoDisponivel, 
    setExisteSuporteTecnicoDisponivel
}) => {
    const handleChange = (e) => {
        if (typeof setExisteSuporteTecnicoDisponivel === 'function') {
            setExisteSuporteTecnicoDisponivel(e.target.value);
        }
    };

    return (
        <div>
            <label htmlFor="existeSuporteTecnicoDisponivel">Existe suporte técnico disponível?</label>
            <select 
                name="existeSuporteTecnicoDisponivel" 
                id="existeSuporteTecnicoDisponivel" 
                value={existeSuporteTecnicoDisponivel || ''} 
                onChange={handleChange} 
                required
            >
                <option value="" disabled>Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        </div>
    )
}

export default SelectSuporteTecnDispo