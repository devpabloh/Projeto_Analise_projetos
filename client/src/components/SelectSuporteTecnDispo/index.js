const SelectSuporteTecnDispo = ({
    existeSuporteTecnicoDisponivel, 
    setExisteSuporteTecnicoDisponivel
}) => {

    return (
        <div>
            <label htmlFor="existeSuporteTecnicoDisponivel">Existe suporte técnico disponível?</label>
            <select 
                name="existeSuporteTecnicoDisponivel" 
                id="existeSuporteTecnicoDisponivel" 
                value={existeSuporteTecnicoDisponivel || ''} 
                onChange={(evento)=> setExisteSuporteTecnicoDisponivel(evento.target.value)} 
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