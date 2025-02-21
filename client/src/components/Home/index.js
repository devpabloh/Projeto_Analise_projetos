import { useEffect, useState } from "react"
import styles from './Home.module.css'

/* importando componentes */
import ModalProjeto from '../ModalProjeto/index'
import Header from "../Header"
import Footer from "../Footer"

const Home = () => {
    const [projetos, setProjetos] = useState([])
    const [modalAberto, setModalAberto] = useState(false)

    const [projetoSelecionado, setProjetoSelecionado] = useState(null)
    const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false)

    useEffect(() => {
        const fetchProjetos = async () => {
            try {
                const response = await fetch('http://localhost:3333/api/projetos');
                const result = await response.json();
                if (result.success) {
                    setProjetos(result.data);
                } else {
                    console.error('Erro:', result.error);
                }
            } catch (error) {
                console.error('Erro ao buscar projetos:', error);
            }
        };
        fetchProjetos();
    }, []);

    const adicionarProjeto = (projeto) => {
        setProjetos([...projetos, projeto])
    }

    const handleDelete = async(id)=>{
        try {
            await fetch(`http://localhost:3333/api/projetos/${id}`, {
                method: 'DELETE'
            });
            setProjetos(projetos.filter(projeto => projeto.id !== id))
        } catch (error) {
            console.error('Erro ao excluir projeto', error)
        }
    }

    const handleEdit = (projeto)=>{
        setProjetoSelecionado(projeto)
        setModalDetalhesAberto(true)
    }

return(
    <>
        <Header/>
        <main className={styles.containerHome}>
            <h1>Projetos</h1>
            <div>
                <button onClick={()=> setModalAberto(true)}> Adicionar Projeto </button>
            </div>
            {projetos.length === 0 ? (
                 <div>
                    <p>Não existem projetos cadastrados</p>
                </div>
            ) : (
                <ul className={styles.containerProjetos} >
                    {projetos.map((projeto, index) => (
                        <li key={projeto.id || index} className={styles.containerProjeto}>
                            <h2>{projeto.nome_projeto}</h2>
                            <div className={styles.dadosProjeto}>
                            <p>Identificador</p>
                            <p>{projeto.id}</p>
                            </div>

                            <div className={styles.dadosProjeto}>
                            <p>Responsável: </p>
                            <p>{projeto.nome_responsavel}</p>
                            </div>

                            <div className={styles.dadosProjeto}>
                                <p>Cargo:</p>
                                <p>{projeto.cargo_responsavel}</p>
                            </div>

                            <div className={styles.dadosProjeto}>
                                <p>Email:</p>
                                <p>{projeto.email_responsavel}</p>
                            </div>

                            <div className={styles.dadosProjeto}>
                                <p>Data de preenchimento: </p>
                                <p>{new Date(projeto.data_preenchimento).toLocaleDateString()}</p>
                            </div>

                            <div className={styles.containerBotoes}>
                                <button className={styles.botaoEditar} onClick={()=> handleEdit(projeto)}>Editar</button>
                                <button className={styles.botaoExcluir} onClick={()=> handleDelete(projeto.id)}>Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {modalAberto && <ModalProjeto fecharModal={()=> setModalAberto(false)} adicionarProjeto={adicionarProjeto}/>}
            
            {modalDetalhesAberto && (
                <ModalProjeto 
                    fecharModal={() => setModalDetalhesAberto(false)}
                    adicionarProjeto={adicionarProjeto}
                    projetoExistente={projetoSelecionado}
                    modoEdicao={true}
                />
            )}
        </main>
        <Footer/>
    </>
)
}

export default Home