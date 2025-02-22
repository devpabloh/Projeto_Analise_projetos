import { useEffect, useState } from "react"
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './Home.module.css'
import ModalProjeto from '../ModalProjeto/index'
import Header from "../Header"
import Footer from "../Footer"

const Home = () => {
    const [projetos, setProjetos] = useState([])
    const [modalAberto, setModalAberto] = useState(false)
    const [projetoSelecionado, setProjetoSelecionado] = useState(null)
    const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false)
    const [modoVisualizacao, setModoVisualizacao] = useState(false)

    useEffect(() => {
        fetchProjetos();
    }, []);

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

    const adicionarProjeto = (projeto) => {
        setProjetos([...projetos, projeto])
    }

    const handleDelete = async(id) => {
        if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
            try {
                await fetch(`http://localhost:3333/api/projetos/${id}`, {
                    method: 'DELETE'
                });
                setProjetos(projetos.filter(projeto => projeto.id !== id))
            } catch (error) {
                console.error('Erro ao excluir projeto', error)
            }
        }
    }

    const handleEdit = (projeto) => {
        setProjetoSelecionado(projeto)
        setModoVisualizacao(false)
        setModalDetalhesAberto(true)
    }

    const handleView = (projeto) => {
        setProjetoSelecionado(projeto)
        setModoVisualizacao(true)
        setModalDetalhesAberto(true)
    }

    return(
        <>
            <Header/>
            <main className={styles.containerHome}>
                <div className={styles.headerSection}>
                    <h1>Projetos</h1>
                    <button 
                        className={styles.addButton}
                        onClick={() => setModalAberto(true)}
                    >
                        Adicionar Projeto
                    </button>
                </div>

                {projetos.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Não existem projetos cadastrados</p>
                    </div>
                ) : (
                    <div className={styles.timeline}>
                        {projetos.map((projeto, index) => (
                            <div key={projeto.id || index} className={styles.timelineItem}>
                                <div className={styles.timelineDate}>
                                    {format(new Date(projeto.data_preenchimento), 
                                        "dd 'de' MMMM 'de' yyyy", 
                                        { locale: ptBR }
                                    )}
                                </div>
                                
                                <div className={styles.timelineContent} onClick={() => handleView(projeto)}>
                                    <h2>{projeto.nome_projeto}</h2>
                                    <div className={styles.projectInfo}>
                                        <p><strong>Responsável:</strong> {projeto.nome_responsavel}</p>
                                        <p><strong>Cargo:</strong> {projeto.cargo_responsavel}</p>
                                        <p><strong>Email:</strong> {projeto.email_responsavel}</p>
                                    </div>
                                    
                                    <div className={styles.projectStatus}>
                                        <span className={styles.statusBadge}>
                                            {projeto.status || 'Em análise'}
                                        </span>
                                    </div>

                                    <div className={styles.actionButtons}>
                                        <button 
                                            className={styles.editButton}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(projeto);
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className={styles.deleteButton}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(projeto.id);
                                            }}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {modalAberto && (
                    <ModalProjeto 
                        fecharModal={() => setModalAberto(false)} 
                        adicionarProjeto={adicionarProjeto}
                    />
                )}
                
                {modalDetalhesAberto && (
                    <ModalProjeto 
                        fecharModal={() => setModalDetalhesAberto(false)}
                        adicionarProjeto={adicionarProjeto}
                        projetoExistente={projetoSelecionado}
                        modoVisualizacao={modoVisualizacao}
                        modoEdicao={!modoVisualizacao}
                    />
                )}
            </main>
            <Footer/>
        </>
    )
}

export default Home