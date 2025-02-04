import { useState } from "react"

const CheckboxQuaisMedidSegu = () => {
    const [criptografiaDeDados, setCriptografiaDeDados] = useState('')
    const [controleDeAcessoEAutenticacao, setControleDeAcessoEAutenticacao] = useState('')
    const [logsDeAuditoria, setLogsDeAuditoria] = useState('')
    const [protecaoContraAtaques, setProtecaoContraAtaques] = useState('')
    const [outrasMedidasDeSeguranca, setOutrasMedidasDeSeguranca] = useState('')

    const handleChange = (evento)=>{
        const {name, checked} = evento.target
        if(checked){
            
        }
    }

    return(
        <div>
            <label >Quais medidas de segurança?</label>
            <div id="quaisMedidSegu">
                <label htmlFor="criptografiaDeDados">
                    <input type="checkbox" name="criptografiaDeDados" id="criptografiaDeDados" value={criptografiaDeDados} onChange={(e) => setCriptografiaDeDados(e.target.value)} />
                    Criptografia de dados
                </label>
            </div>
            <div >
                <label htmlFor="controleDeAcessoEAutenticacao">
                    <input type="checkbox" name="controleDeAcessoEAutenticacao" id="controleDeAcessoEAutenticacao" value={controleDeAcessoEAutenticacao} onChange={(e) => setControleDeAcessoEAutenticacao(e.target.value)} />
                    Controle de acesso e autenticação
                </label>
            </div>
            <div>
                <label htmlFor="logsDeAuditoria">
                    <input type="checkbox" name="logsDeAuditoria" id="logsDeAuditoria" value={logsDeAuditoria} onChange={(e) => setLogsDeAuditoria(e.target.value)} />
                    Logs de auditoria
                </label>
            </div>
            <div >
                <label htmlFor="protecaoContraAtaques">
                    <input type="checkbox" name="protecaoContraAtaques" id="protecaoContraAtaques" value={protecaoContraAtaques} onChange={(e) => setProtecaoContraAtaques(e.target.value)} />
                    Proteção contra ataques DDoS, SQL Injection, etc.
                </label>
            </div>
            <div>
                <label htmlFor="outrasMedidasDeSeguranca">
                    <input type="checkbox" name="outrasMedidasDeSeguranca" id="outrasMedidasDeSeguranca" value={outrasMedidasDeSeguranca} onChange={(e) => setOutrasMedidasDeSeguranca(e.target.value)} />
                    Outras medidas de segurança
                </label>
            </div>
        </div>

        {outrasMedidasDeSeguranca === isChecked && <div>
            <label htmlFor="outrasMedidasDeSeguranca">Qual(es) outras medidas de segurança foram implementadas?</label>
            <input type="text" name="outrasMedidasDeSeguranca" id="outrasMedidasDeSeguranca" value={outrasMedidasDeSeguranca} onChange={(e) => setOutrasMedidasDeSeguranca(e.target.value)} />
        </div>}
    )
}

export default CheckboxQuaisMedidSegu