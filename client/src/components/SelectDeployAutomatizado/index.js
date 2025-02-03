import {useState} from "react"

const SelectDeployAutomatizado = () => {
    const [deployAutomatizado, setDeployAutomatizado] = useState('')
    return(
        <div>
            <label>A implantação é feita de forma automatizada CI/CD ?</label>
            <select name="deployAutomatizado" value={deployAutomatizado} onChange={(evento)=> setDeployAutomatizado(evento.target.value)}  required>
                <option value="" disabled selected >Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
                <option value="parcialmente">Parcialmente</option>
            </select>
            
        </div>
    )
}

export default SelectDeployAutomatizado