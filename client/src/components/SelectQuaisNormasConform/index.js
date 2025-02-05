import { useState } from "react";

const SelectQuaisNormasConform = () => {
    const [quaisNormasConform, setQuaisNormasConform] = useState([]);
    const [outrasNormas, setOutrasNormas] = useState(""); // Novo estado para armazenar o valor das outras normas

    const handleChange = (evento) => {
        const { name, checked, value } = evento.target;

        if (checked) {
            // Adiciona a norma ao array
            setQuaisNormasConform(prev => [...prev, name]);
        } else {
            // Remove a norma do array
            setQuaisNormasConform(prev => prev.filter(item => item !== name));
        }

        // Se o campo de texto "outrasNormas" for alterado, atualize o estado
        if (name === "outrasNormas") {
            setOutrasNormas(value);
            setQuaisNormasConform(prev => {
                // Verifica se o valor não está vazio antes de adicionar
                if (value && !prev.includes(value)) {
                    return [...prev, value];
                }
                return prev;
            });
        }
    };

    return (
        <div>
            <label>Quais normas de conformidade?</label>
            <label htmlFor="lgpd">
                <input type="checkbox" name="lgpd" onChange={handleChange} checked={quaisNormasConform.includes("lgpd")} />
                LGPD
            </label>
            <label htmlFor="GDPR">
                <input type="checkbox" name="GDPR" onChange={handleChange} checked={quaisNormasConform.includes("GDPR")} />
                GDPR
            </label>
            <label htmlFor="ISO 27001">
                <input type="checkbox" name="ISO 27001" onChange={handleChange} checked={quaisNormasConform.includes("ISO 27001")} />
                ISO 27001
            </label>
            <label htmlFor="PCI-DSS">
                <input type="checkbox" name="PCI-DSS" onChange={handleChange} checked={quaisNormasConform.includes("PCI-DSS")} />
                PCI-DSS
            </label>
            <label htmlFor="outrasNormas">
                <input type="checkbox" name="OutrasNormas" onChange={handleChange} checked={quaisNormasConform.includes("OutrasNormas")} />
                Outras Normas
            </label>
            {quaisNormasConform.includes("OutrasNormas") && 
                <div>
                    <label>Qual(o(s) tipo(s) de norma(s) ?</label>
                    <input type="text" name="outrasNormas" onChange={handleChange} value={outrasNormas} />
                    {console.log(quaisNormasConform)} {/* Para depuração */}
                </div>
            }
        </div>
    );
};

export default SelectQuaisNormasConform;