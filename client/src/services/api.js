import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3333/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor for error handling
api.interceptors.response.use(
    response => response.data,
    error => {
        const customError = new Error(
            error.response?.data?.message || 'Ocorreu um erro na requisição'
        );
        customError.status = error.response?.status;
        customError.data = error.response?.data;
        throw customError;
    }
);

export const projetoService = {
    async criar(dadosProjeto) {
        try {
            if (!dadosProjeto.nome_projeto || !dadosProjeto.descricao_resumida) {
                throw new Error('Nome do projeto e descrição são obrigatórios');
            }

            return await api.post('/projects', dadosProjeto);
        } catch (error) {
            console.error('Erro ao criar projeto:', error);
            throw error;
        }
    },

    async listar(params = { pagina: 1, limite: 10, query: '', status: '', responsavel: '' }) {
        try {
            return await api.get('/projects', {
                params: {
                    page: params.pagina,
                    limit: params.limite,
                    query: params.query,
                    status: params.status,
                    responsavel: params.responsavel
                }
            });
        } catch (error) {
            console.error('Erro ao listar projetos:', error);
            throw error;
        }
    },

    async buscarPorId(id) {
        try {
            return await api.get(`/projects/${id}`);
        } catch (error) {
            console.error('Erro ao buscar projeto:', error);
            throw error;
        }
    },

    async atualizar(id, dadosProjeto) {
        try {
            return await api.put(`/projects/${id}`, dadosProjeto);
        } catch (error) {
            console.error('Erro ao atualizar projeto:', error);
            throw error;
        }
    },

    async excluir(id) {
        try {
            await api.delete(`/projects/${id}`);
            return true;
        } catch (error) {
            console.error('Erro ao excluir projeto:', error);
            throw error;
        }
    },

    async buscarEstatisticas() {
        try {
            return await api.get('/projects/statistics/overview');
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error);
            throw error;
        }
    },

    async atualizarEmLote(ids, dados) {
        try {
            return await api.put('/projects/bulk/update', {
                ids,
                dados
            });
        } catch (error) {
            console.error('Erro ao atualizar projetos em lote:', error);
            throw error;
        }
    },

    async exportarDados(formato = 'json') {
        try {
            const response = await api.get('/projects/export/data', {
                params: { format: formato },
                responseType: formato === 'csv' ? 'blob' : 'json'
            });

            if (formato === 'csv') {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `projetos_${new Date().toISOString()}.csv`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            }

            return response;
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            throw error;
        }
    },

    async buscarPorFiltros(filtros) {
        try {
            return await api.get('/projects/search/projects', {
                params: filtros
            });
        } catch (error) {
            console.error('Erro ao buscar projetos com filtros:', error);
            throw error;
        }
    }
};

// Request interceptor for adding auth token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;