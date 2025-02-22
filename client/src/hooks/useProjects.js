import { useQuery, useMutation, useQueryClient } from 'react-query';
import { projetoService } from '../services/api';

export function useProjects() {
    // Instância do queryClient para gerenciar o cache
    const queryClient = useQueryClient();

    // Query para listar projetos com paginação e filtros
    const { 
        data: projects, 
        isLoading, 
        error,
        refetch 
    } = useQuery(
        ['projects'],
        () => projetoService.listar(),
        {
            staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos
            refetchOnWindowFocus: false // Não recarrega ao focar na janela
        }
    );

    // Mutation para criar novo projeto
    const createProject = useMutation(
        (newProject) => projetoService.criar(newProject),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('projects');
            },
            onError: (error) => {
                console.error('Erro ao criar projeto:', error);
            }
        }
    );

    // Mutation para atualizar projeto existente
    const updateProject = useMutation(
        ({ id, data }) => projetoService.atualizar(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('projects');
            },
            onError: (error) => {
                console.error('Erro ao atualizar projeto:', error);
            }
        }
    );

    // Mutation para excluir projeto
    const deleteProject = useMutation(
        (id) => projetoService.excluir(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('projects');
            },
            onError: (error) => {
                console.error('Erro ao excluir projeto:', error);
            }
        }
    );

    // Query para buscar estatísticas
    const { 
        data: statistics,
        isLoading: statsLoading 
    } = useQuery(
        'projectStatistics',
        () => projetoService.buscarEstatisticas(),
        {
            staleTime: 1000 * 60 * 15, // Cache válido por 15 minutos
            refetchOnWindowFocus: false
        }
    );

    // Mutation para atualização em lote
    const bulkUpdate = useMutation(
        ({ ids, data }) => projetoService.atualizarEmLote(ids, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('projects');
            },
            onError: (error) => {
                console.error('Erro na atualização em lote:', error);
            }
        }
    );

    // Query para exportar dados
    const exportData = useMutation(
        (format) => projetoService.exportarDados(format),
        {
            onError: (error) => {
                console.error('Erro ao exportar dados:', error);
            }
        }
    );

    // Função para buscar projetos com filtros
    const searchProjects = useMutation(
        (filters) => projetoService.buscarPorFiltros(filters),
        {
            onError: (error) => {
                console.error('Erro na busca de projetos:', error);
            }
        }
    );

    // Retorna todas as funções e dados necessários
    return {
        projects,         // Dados dos projetos
        isLoading,       // Estado de carregamento
        error,           // Erros de carregamento
        statistics,      // Estatísticas dos projetos
        statsLoading,    // Estado de carregamento das estatísticas
        createProject,   // Função para criar projeto
        updateProject,   // Função para atualizar projeto
        deleteProject,   // Função para excluir projeto
        bulkUpdate,      // Função para atualização em lote
        exportData,      // Função para exportar dados
        searchProjects,  // Função para buscar projetos com filtros
        refetch         // Função para recarregar dados
    };
}