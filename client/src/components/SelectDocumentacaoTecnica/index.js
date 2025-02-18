
/* Importando css */
import styles from "./SelectDocumentacaoTecnica.module.css"

const SelectDocumentacaoTecnica = ({
    documentacaoTecnica,
    setDocumentacaoTecnica,
    selectedOptions, 
    setSelectedOptions,
    outrosDocumentosTecnicos, 
    setOutrosDocumentosTecnicos
}) => {
    

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
        <div className={styles.containerSelectDocumentacaoTecnica}>
            <label htmlFor="documentacaoTecnica">O projeto possui documentação tecnica ?</label>
            <select name="documentacaoTecnica" id="documentacaoTecnica" value={documentacaoTecnica} onChange={(evento)=> setDocumentacaoTecnica(evento.target.value)} required>
                <option value="" disabled>Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>

            {documentacaoTecnica === "sim" && 
                <div className={styles.containerCheckboxes}>
                    <label>Quais tipos de documentação tecnica ?</label>
                    <label>
                        <input type="checkbox" value="arquiteturaDoSistema" onChange={handleSelectChange} checked={selectedOptions.includes("arquiteturaDoSistema")} />
                        Arquitetura do sistema
                    </label>
                    <label>
                        <input type="checkbox" value="estruturaDeBancoDeDados" onChange={handleSelectChange} checked={selectedOptions.includes("estruturaDeBancoDeDados")} />
                        Estrutura de Banco de Dados
                    </label>
                    <label>
                        <input type="checkbox" value="documentacaoDeAPIs" onChange={handleSelectChange} checked={selectedOptions.includes("documentacaoDeAPIs")} />
                        Documentação de APIs
                    </label>
                    <label>
                        <input type="checkbox" value="manualDoUsuario" onChange={handleSelectChange} checked={selectedOptions.includes("manualDoUsuario")} />
                        Manual do usuário
                    </label>
                    <label>
                        <input type="checkbox" value="outros" onChange={handleSelectChange} checked={selectedOptions.includes("outros")} />
                        Outros
                    </label>
                </div>
            }

            {selectedOptions.includes("outros") && 
                <div>
                    <label htmlFor="outros">Quais documentos ?</label>
                    <input type="text" name="outros" id="outros" value={outrosDocumentosTecnicos} onChange={(evento)=> setOutrosDocumentosTecnicos(evento.target.value)} />
                </div>}

        </div>
    )
}

export default SelectDocumentacaoTecnica