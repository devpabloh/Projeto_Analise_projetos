import { useState } from "react"
import styles from './Home.module.css'
import ModalProjeto from '../ModalProjeto/index'

const Home = () => {
    const [projetos, setProjetos] = useState([])
    const [modalAberto, setModalAberto] = useState(false)

const adicionarProjeto = (projeto) => {
    setProjetos([...projetos, projeto])
}

return(
    <main className={styles.container}>
        <h1>Projetos</h1>
        {projetos.length === 0 ? (
            <div>
                <p>Não existem projetos cadastrados</p>
                <button onClick={()=> setModalAberto(true)}> Adicionar Projeto </button>
            </div>
        ) : (
            <ul>
                {projetos.map((projeto, index) => (
                    <li key={index}>
                        <h2>{projeto.titulo}</h2>
                        <p>{projeto.descricao}</p>
                        <p>Início: {projeto.inicio}</p>
                        <p>Fim: {projeto.fim}</p>
                        <p>Status: {projeto.status}</p>
                    </li>
                ))}
            </ul>
        )}
        {modalAberto && <ModalProjeto fecharModal={()=> setModalAberto(false)} adicionarProjeto={adicionarProjeto}/>}
    </main>
)
}

export default Home