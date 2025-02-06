import { useState } from "react"
import styles from "./FieldsetStatusDesen.module.css"

const FieldsetStatusDesen = () => {
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [status, setStatus] = useState('');

    const objetoStatusDesenvolvimento = [
        { value: "inicio", label: "Ideia / iniciação"},
        { value: "desenvolvimento", label:"Desenvolvimento"},
        { value: "testes", label:"Testes"},
        { value: "homologacao", label:"Homologação"},
        { value: "producao", label:"Produção"},
        { value: "Encerrado", label:"Encerrado"},

    ]

    return(
        <fieldset className={styles.containerFieldset}>
                        <legend>Status de desenvolvimento</legend>
                        <div>
                            <label  htmlFor="dataInicial">Inicio do projeto</label>
                            <input
                                type="date"
                                name="dataInicial"
                                id="dataInicial"
                                value={dataInicial}
                                onChange={(evento)=> setDataInicial(evento.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label  htmlFor="dataFinal">Fim do projeto</label>
                            <input
                                type="date"
                                name="dataFinal"
                                id="dataFinal"
                                value={dataFinal}
                                onChange={(evento)=> setDataFinal(evento.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label  htmlFor="status">Status</label>
                            <select name="status" id="status" value={status} onChange={(evento)=> setStatus(evento.target.value)} required>
                                <option value="" disabled>Selecione o status</option>
                                {objetoStatusDesenvolvimento.map((status)=>(
                                    <option value={status.value}>{status.label}</option>
                                ))}
                            </select>
                        </div>
        </fieldset>
    )
}

export default FieldsetStatusDesen