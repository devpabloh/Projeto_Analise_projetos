import { useState } from "react"

export const SelectTestes = () => {
    const [quaisTestes, setQuaisTestes] = useState('')
    

    const opcoesTestes = [
        { value: "unitarios", label: "Testes Unitários" },
        { value: "integracao", label: "Testes de Integração" },
        { value: "aceitacao", label: "Testes de Aceitação" },
        { value: "performance", label: "Testes de Performance" }
    ];
    return(
        <div>
            <label>Quais testes foram realizados?</label>
            <select name="quaisTestes" value={quaisTestes} onChange={(e) => setQuaisTestes(e.target.value)} required>
                <option value="" disabled>Selecione o teste</option>
                {opcoesTestes.map((teste) => (
                            <option key={teste.value} value={teste.value}>
                                {teste.label}
                            </option>
                ))}
            </select>
        </div>
    )
}

export const PassouPorTestes = ({onchange}) => {

    return(
        <div>
            <label>O projeto já passou por testes?</label>
            <select  onChange={(e) => onchange(e.target.value)} required>
                <option value="" disabled selected >Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        </div>
    )
}
