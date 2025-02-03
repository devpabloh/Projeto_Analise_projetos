import { useState } from "react"

import SelectFoiImplementado from "../SelectFoiImplementado"

const SelectImplementado = ()=>{

    const [implementado, setImplementado] = useState('')

    return(
        <div>
            <label>O projeto foi implementado em algum ambiente?</label>
            <select name="implementado" value={implementado} onChange={(evento)=> setImplementado(evento.target.value)}  required>
                <option value="" disabled >Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
            {implementado === "sim" && <SelectFoiImplementado/>}
        </div>
    )
}

export default SelectImplementado