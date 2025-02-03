import { useState } from "react"

const SelectFoiImplementado = ({onChange}) => {

    const [foiImplementadoQual, setFoiImplementadoQual] = useState(false)


    return(
        <div>
            <label>O projeto foi implementado em algum ambiente?</label>
            <select name="foiImplementadoQual" value={foiImplementadoQual} onChange={(evento)=> setFoiImplementadoQual(evento.target.value)}  required>
                <option value="AmbienteDeDesenvolvimento">Ambiente de desenvolvimento</option>
                <option value="AmbienteDeHomologacao">Ambiente de homologação</option>
                <option value="AmbienteDeProducao">Ambiente de produção</option>
            </select>
        </div>
    )
}

export default SelectFoiImplementado