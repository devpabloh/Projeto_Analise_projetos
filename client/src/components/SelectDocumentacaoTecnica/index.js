import {useState} from "react"

const SelectDocumentacaoTecnica = () => {
    const [documentacaoTecnica, setDocumentacaoTecnica] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedOptions(prevSelected => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter(option => option !== value);
            } else {
                return [...prevSelected, value];
            }
        });
    };

    return(
        <div>
            <label>O projeto possui documentação tecnica ?</label>
            <select name="documentacaoTecnica" value={documentacaoTecnica} onChange={(evento)=> setDocumentacaoTecnica(evento.target.value)} required>
                <option value="" disabled>Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>

            {documentacaoTecnica === "sim" && 
                <div>
                    <select multiple value={selectedOptions} onChange={handleSelectChange}>
                        <option value="arquiteturaDoSistema">Arquitetura do sistema</option>
                        <option value="estruturaDeBancoDeDados">Estrutura de Banco de Dados</option>
                        <option value="documentacaoDeAPIs">Documentação de APIs</option>
                        <option value="manualDoUsuario">Manual do usuário</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>
            }

            {selectedOptions.includes("outros") && 
                <div>
                    <label htmlFor="outros">Quais documentos ?</label>
                    <input type="text" name="outros" id="outros" />
                </div>}

        </div>
    )
}

export default SelectDocumentacaoTecnica