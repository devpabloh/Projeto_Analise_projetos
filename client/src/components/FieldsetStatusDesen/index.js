import { useState } from "react"
import styles from "./FieldsetStatusDesen.module.css"

const FieldsetStatusDesen = () => {
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [status, setStatus] = useState('');
    

    return(
        <fieldset className={styles.containerFieldset}>
                            <legend>Status de desenvolvimento</legend>
                            <div>
                            <label>Nome do projeto</label>
                            <input
                                type="text"
                                name="nomeprojeto"
                                value={nomeProjeto}
                                onChange={(evento)=> setNomeProjeto(evento.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Inicio do projeto</label>
                            <input
                                type="date"
                                name="dataInicial"
                                value={dataInicial}
                                onChange={(evento)=> setDataInicial(evento.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Fim do projeto</label>
                            <input
                                type="date"
                                name="dataFinal"
                                value={dataFinal}
                                onChange={(evento)=> setDataFinal(evento.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Status</label>
                            <select name="status" value={status} onChange={(evento)=> setStatus(evento.target.value)} required>
                                <option value="" disabled>Selecione o status</option>
                                <option value="inicio">Ideia / iniciação</option>
                                <option value="desenvolvimento">Desenvolvimento</option>
                                <option value="testes">Testes</option>
                                <option value="homologacao">Homologação</option>
                                <option value="producao">Produção</option>
                                <option value="Encerrado">Encerrado</option>
                            </select>
                        </div>
        </fieldset>
    )
}

export default FieldsetStatusDesen