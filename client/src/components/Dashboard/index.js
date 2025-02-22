import React, { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './Dashboard.module.css';

export function Dashboard() {
    const { projects, statistics, isLoading, error, exportData } = useProjects();
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    // Função para calcular percentuais
    const calculatePercentage = (value, total) => {
        return total > 0 ? Math.round((value / total) * 100) : 0;
    };

    // Função para exportar dados
    const handleExport = async (format) => {
        try {
            await exportData.mutateAsync(format);
        } catch (error) {
            console.error('Erro ao exportar:', error);
        }
    };

    if (isLoading) return <div className={styles.loading}>Carregando...</div>;
    if (error) return <div className={styles.error}>Erro ao carregar estatísticas</div>;

    return (
        <div className={styles.dashboard}>
            <header className={styles.dashboardHeader}>
                <h2>Dashboard de Projetos</h2>
                <div className={styles.actions}>
                    <select 
                        value={selectedPeriod} 
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        <option value="month">Último Mês</option>
                        <option value="quarter">Último Trimestre</option>
                        <option value="year">Último Ano</option>
                    </select>
                    <button onClick={() => handleExport('csv')}>Exportar CSV</button>
                </div>
            </header>

            <div className={styles.statsGrid}>
                {/* Estatísticas Gerais */}
                <div className={styles.statCard}>
                    <h3>Total de Projetos</h3>
                    <p className={styles.statValue}>{statistics?.total || 0}</p>
                    <span className={styles.statLabel}>Projetos Cadastrados</span>
                </div>

                {/* Implementação */}
                <div className={styles.statCard}>
                    <h3>Implementação</h3>
                    <p className={styles.statValue}>
                        {calculatePercentage(statistics?.implemented || 0, statistics?.total)}%
                    </p>
                    <span className={styles.statLabel}>
                        {statistics?.implemented || 0} projetos implementados
                    </span>
                </div>

                {/* Documentação */}
                <div className={styles.statCard}>
                    <h3>Documentação</h3>
                    <p className={styles.statValue}>
                        {calculatePercentage(statistics?.documented || 0, statistics?.total)}%
                    </p>
                    <span className={styles.statLabel}>
                        {statistics?.documented || 0} projetos documentados
                    </span>
                </div>

                {/* Testes */}
                <div className={styles.statCard}>
                    <h3>Testes</h3>
                    <p className={styles.statValue}>
                        {calculatePercentage(statistics?.tested || 0, statistics?.total)}%
                    </p>
                    <span className={styles.statLabel}>
                        {statistics?.tested || 0} projetos testados
                    </span>
                </div>
            </div>

            {/* Estatísticas de Deploy */}
            <section className={styles.deploymentSection}>
                <h3>Estatísticas de Deploy</h3>
                <div className={styles.deployGrid}>
                    <div className={styles.deployCard}>
                        <h4>Deploy Automatizado</h4>
                        <p className={styles.deployValue}>
                            {statistics?.deployment?.automatedDeploy || 0}
                        </p>
                    </div>
                    <div className={styles.deployCard}>
                        <h4>Deploy Estruturado</h4>
                        <p className={styles.deployValue}>
                            {statistics?.deployment?.structuredDeploy || 0}
                        </p>
                    </div>
                    <div className={styles.deployCard}>
                        <h4>Rollback Automático</h4>
                        <p className={styles.deployValue}>
                            {statistics?.deployment?.automatedRollback || 0}
                        </p>
                    </div>
                </div>
            </section>

            {/* Últimos Projetos */}
            <section className={styles.recentProjects}>
                <h3>Últimos Projetos</h3>
                <div className={styles.projectsList}>
                    {projects?.slice(0, 5).map(project => (
                        <div key={project.id} className={styles.projectCard}>
                            <h4>{project.nome_projeto}</h4>
                            <p>{project.descricao_resumida}</p>
                            <span className={styles.projectDate}>
                                {format(new Date(project.data_criacao), 
                                    "dd 'de' MMMM 'de' yyyy", 
                                    { locale: ptBR }
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}