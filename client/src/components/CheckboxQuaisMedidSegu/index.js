import { useState } from "react";

const CheckboxQuaisMedidSegu = () => {
    const [value, setValue] = useState([]);
    const [outrasMedidasDeSeguranca, setOutrasMedidasDeSeguranca] = useState('');

    const handleChange = (evento) => {
        const { name, checked } = evento.target;
        if (checked) {
            setValue(prev => [...prev, name]);
        } else {
            setValue(prev => prev.filter(item => item !== name));
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setOutrasMedidasDeSeguranca(inputValue);

        // Adiciona o valor do campo de texto ao array se não estiver vazio
        if (inputValue) {
            setValue(prev => {
                // Verifica se o valor não está vazio e não está já no array
                if (!prev.includes(inputValue)) {
                    return [...prev, inputValue];
                }
                return prev;
            });
        } else {
            // Se o campo de texto estiver vazio, remove do array
            setValue(prev => prev.filter(item => item !== inputValue));
        }
    };

    return (
        <div>
            <label>Quais medidas de segurança?</label>
            <div id="quaisMedidSegu">
                <label>
                    <input type="checkbox" name="criptografiaDeDados" checked={value.includes("criptografiaDeDados")} onChange={handleChange} />
                    Criptografia de dados
                </label>
            </div>
            <div>
                <label>
                    <input type="checkbox" name="controleDeAcessoEAutenticacao" checked={value.includes("controleDeAcessoEAutenticacao")} onChange={handleChange} />
                    Controle de acesso e autenticação
                </label>
            </div>
            <div>
                <label>
                    <input type="checkbox" name="outrasMedidasDeSeguranca" checked={value.includes("outrasMedidasDeSeguranca")} onChange={handleChange} />
                    Outras medidas de segurança
                </label>
            </div>

            {value.includes("outrasMedidasDeSeguranca") && 
                <div>
                    <label>Especifique:</label>
                    <input type="text" value={outrasMedidasDeSeguranca} onChange={handleInputChange} />
                </div>
            }
            {console.log(value)}
        </div>
    );
};

export default CheckboxQuaisMedidSegu;