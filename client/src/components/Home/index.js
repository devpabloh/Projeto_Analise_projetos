import { useState } from "react"
import styles from './Home.module.css'

/* importando componentes */
import ModalProjeto from '../ModalProjeto/index'
import Header from "../Header"

const Home = () => {
    const [projetos, setProjetos] = useState([])
    const [modalAberto, setModalAberto] = useState(false)

const adicionarProjeto = (projeto) => {
    setProjetos([...projetos, projeto])
}

return(
    <>
        <Header/>
        <main className={styles.containerHome}>
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
    </>
)
}

export default Home