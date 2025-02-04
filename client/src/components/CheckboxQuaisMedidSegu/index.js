import { useState } from "react"

const CheckboxQuaisMedidSegu = () => {
    const [value, setValue] = useState([]);
    const [outrasMedidasDeSeguranca, setOutrasMedidasDeSeguranca] = useState('');

    const handleChange = (evento)=>{
        const {name, checked} = evento.target
        if(checked){
            setValue([...value, name])
        }else{
            setValue(value.filter(item => item !== name))
        }
    }

    return(
        <div>
            <label >Quais medidas de segurança?</label>
            <div id="quaisMedidSegu">
                <label>
                    <input type="checkbox" name="criptografiaDeDados"  value="criptografiaDeDados" checked={value.includes("criptografiaDeDados")} onChange={(e) => handleChange(e)} />
                    Criptografia de dados
                </label>
            </div>
            <div >
                <label>
                    <input type="checkbox" name="controleDeAcessoEAutenticacao"  value="controleDeAcessoEAutenticacao" checked={value.includes("controleDeAcessoEAutenticacao")} onChange={(e) => handleChange(e)} />
                    Controle de acesso e autenticação
                </label>
            </div>
            <div>
                <label >
                    <input type="checkbox" name="logsDeAuditoria" value="logsDeAuditoria" checked={value.includes("logsDeAuditoria")} onChange={(e) => handleChange(e)} />
                    Logs de auditoria
                </label>
            </div>
            <div >
                <label >
                    <input type="checkbox" name="protecaoContraAtaques" value="protecaoContraAtaques" checked={value.includes("protecaoContraAtaques")} onChange={(e) => handleChange(e)} />
                    Proteção contra ataques DDoS, SQL Injection, etc.
                </label>
            </div>
            <div>
                <label >
                    <input type="checkbox" name="outrasMedidasDeSeguranca" value="outrasMedidasDeSeguranca" checked={value.includes("outrasMedidasDeSeguranca")} onChange={(e) => handleChange(e)} />
                    Outras medidas de segurança
                </label>
            </div>

            {value.includes("outrasMedidasDeSeguranca") && 
                <div>
                    <label htmlFor="outrasMedidasDeSeguranca">Quais documentos ?</label>
                    <input type="text" name="outrasMedidasDeSeguranca" id="outrasMedidasDeSeguranca" value={outrasMedidasDeSeguranca} onChange={(evento)=> setOutrasMedidasDeSeguranca(evento.target.value)} />
                </div>
                }
        </div>

       
    )
}

export default CheckboxQuaisMedidSegu