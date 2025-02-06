import { useState } from "react"

const SelectSuporteTecnDispo = ()=>{
    const [existeSuporteTecnicoDisponivel, setExisteSuporteTecnicoDisponivel] = useState('')

    return(
        <div>
            <label htmlFor="existeSuporteTecnicoDisponivel">Existe suporte técnico disponível?</label>
                <select name="existeSuporteTecnicoDisponivel" id="existeSuporteTecnicoDisponivel" value={existeSuporteTecnicoDisponivel} onChange={(e) => setExisteSuporteTecnicoDisponivel(e.target.value)} required>
                    <option value="" disabled selected>Selecione uma opção</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Nao</option>
                </select>
        </div>
    )
}

export default SelectSuporteTecnDispo