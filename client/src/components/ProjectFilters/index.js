import React from 'react';
import styles from './ProjectFilters.module.css';

export function ProjectFilters({ onFilterChange }) {
    return (
        <div className={styles.filters}>
            <div className={styles.filterGroup}>
                <label>Status de Implementação</label>
                <select onChange={(e) => onFilterChange('implementacao', e.target.value)}>
                    <option value="">Todos</option>
                    <option value="implementado">Implementado</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="nao_implementado">Não Implementado</option>
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label>Status de Documentação</label>
                <select onChange={(e) => onFilterChange('documentacao', e.target.value)}>
                    <option value="">Todos</option>
                    <option value="documentado">Documentado</option>
                    <option value="parcial">Parcialmente Documentado</option>
                    <option value="nao_documentado">Não Documentado</option>
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label>Status de Testes</label>
                <select onChange={(e) => onFilterChange('testes', e.target.value)}>
                    <option value="">Todos</option>
                    <option value="testado">Testado</option>
                    <option value="parcial">Parcialmente Testado</option>
                    <option value="nao_testado">Não Testado</option>
                </select>
            </div>
        </div>
    );
}