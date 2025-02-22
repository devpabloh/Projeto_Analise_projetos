import { Project } from '../models/Project.js';
import  cacheManager  from '../utils/cache.js';
import { logger } from '../utils/logger.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';

export class ProjetoController {
    static async create(req, res) {
        try {
            // Mapear os campos corretamente
            const projectData = {
                ...req.body,
                responsavel_nome: req.body.nome_responsavel,
                responsavel_cargo: req.body.cargo_responsavel,
                responsavel_email: req.body.email_responsavel,
                status_atual: req.body.status || 'Em análise',
                data_preenchimento: req.body.data_preenchimento || new Date(),
                user_id: req.user?.id // Adiciona o ID do usuário logado
            };

            const project = new Project(projectData);
            project.validate();
            
            const savedProject = await project.save();
            
            // Registrar a atividade de criação
            await Project.registerActivity({
                project_id: savedProject.id,
                user_id: req.user?.id,
                action_type: 'create',
                description: 'Projeto criado',
                changes: projectData
            });
            
            logger.logToFile(`Projeto criado: ${savedProject.nome_projeto}`, 'project');
            
            return res.status(201).json({
                success: true,
                data: savedProject,
                message: 'Projeto criado com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro ao criar projeto: ${error.message}`, 'error');
            return res.status(400).json({
                success: false,
                error: 'Erro ao criar projeto',
                message: error.message
            });
        }
    }

    static async getAll(req, res) {
        try {
            const projects = await Project.findAll();
            return res.json({
                success: true,
                data: projects,
                message: 'Projetos recuperados com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro ao listar projetos: ${error.message}`, 'error');
            return res.status(500).json({
                success: false,
                error: 'Erro ao listar projetos',
                message: error.message
            });
        }
    }

    static async getById(req, res) {
        try {
            const project = await Project.findById(req.params.id);
            if (!project) {
                throw new NotFoundError('Projeto não encontrado');
            }
            return res.json({
                success: true,
                data: project,
                message: 'Projeto recuperado com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro ao buscar projeto: ${error.message}`, 'error');
            return res.status(error instanceof NotFoundError ? 404 : 500).json({
                success: false,
                error: 'Erro ao buscar projeto',
                message: error.message
            });
        }
    }

    static async update(req, res) {
        try {
            const project = await Project.findById(req.params.id);
            if (!project) {
                throw new NotFoundError('Projeto não encontrado');
            }
            
            Object.assign(project, updateData);
            project.validate();
            
            const updatedProject = await project.save();

            await Project.registerActivity({
                project_id: updatedProject.id,
                user_id: req.user?.id,
                action_type: 'update',
                description: 'Projeto atualizado',
                changes: {
                    before: oldData,
                    after: updateData
                }
            });

            cacheManager.invalidate(`project_${req.params.id}`);
            
            logger.logToFile(`Projeto atualizado: ${updatedProject.nome_projeto}`, 'project');
            
            return res.json({
                success: true,
                data: updatedProject,
                message: 'Projeto atualizado com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro ao atualizar projeto: ${error.message}`, 'error');
            return res.status(error instanceof NotFoundError ? 404 : 400).json({
                success: false,
                error: 'Erro ao atualizar projeto',
                message: error.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const project = await Project.findById(req.params.id);
            if (!project) {
                throw new NotFoundError('Projeto não encontrado');
            }
            
            await Project.delete(req.params.id);
            cacheManager.invalidate(`project_${req.params.id}`);
            
            logger.logToFile(`Projeto deletado: ${project.nome_projeto}`, 'project');
            
            return res.json({
                success: true,
                message: 'Projeto deletado com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro ao deletar projeto: ${error.message}`, 'error');
            return res.status(error instanceof NotFoundError ? 404 : 500).json({
                success: false,
                error: 'Erro ao deletar projeto',
                message: error.message
            });
        }
    }


    static async search(req, res) {
        try {
            const { query, status, responsavel } = req.query;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            
            const cacheKey = `search_${query}_${status}_${responsavel}_page${page}_limit${limit}`;
            
            const results = await cacheManager.getOrSet(
                cacheKey,
                () => Project.search({ query, status, responsavel, page, limit }),
                300 // Cache por 5 minutos
            );
            
            logger.logToFile(`Busca realizada: "${query}", status: ${status}, responsável: ${responsavel}`, 'project');
            
            return res.json({
                success: true,
                data: results,
                message: 'Busca realizada com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro na busca: ${error.message}`, 'error');
            return res.status(500).json({
                success: false,
                error: 'Erro ao realizar busca',
                message: error.message
            });
        }
    }

    static async getStatistics(req, res) {
        try {
            const cacheKey = 'project_statistics';
            
            const stats = await cacheManager.getOrSet(
                cacheKey,
                () => Project.getStatistics(),
                1800 // Cache por 30 minutos
            );
            
            logger.logToFile('Estatísticas recuperadas', 'project');
            
            return res.json({
                success: true,
                data: stats,
                message: 'Estatísticas recuperadas com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro ao buscar estatísticas: ${error.message}`, 'error');
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar estatísticas',
                message: error.message
            });
        }
    }

    static async bulkUpdate(req, res) {
        try {
            const { ids, data } = req.body;
            
            if (!Array.isArray(ids) || ids.length === 0) {
                throw new ValidationError('IDs inválidos');
            }

            const updatedProjects = await Project.bulkUpdate(ids, data);
            
            // Invalida caches relacionados aos projetos
            ids.forEach(id => cacheManager.invalidate(`project_${id}`));
            cacheManager.invalidatePattern('projects_list');
            
            logger.logToFile(`Atualização em lote: ${ids.join(', ')}`, 'project');
            
            return res.json({
                success: true,
                data: updatedProjects,
                message: 'Projetos atualizados com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro na atualização em lote: ${error.message}`, 'error');
            return res.status(500).json({
                success: false,
                error: 'Erro ao atualizar projetos',
                message: error.message
            });
        }
    }

    static async export(req, res) {
        try {
            const { format } = req.query;
            const cacheKey = `export_${format}`;
            
            const exportData = await cacheManager.getOrSet(
                cacheKey,
                () => Project.exportData(format),
                600 // Cache por 10 minutos
            );
            
            logger.logToFile(`Exportação realizada: formato ${format}`, 'project');
            
            res.setHeader('Content-Type', format === 'csv' ? 'text/csv' : 'application/json');
            res.setHeader('Content-Disposition', `attachment; filename=projetos.${format}`);
            
            return res.send(exportData);
        } catch (error) {
            logger.logToFile(`Erro na exportação: ${error.message}`, 'error');
            return res.status(500).json({
                success: false,
                error: 'Erro ao exportar dados',
                message: error.message
            });
        }
    }

    static async getImplementationMetrics(req, res) {
        try {
            const metrics = await Project.getImplementationMetrics();
            return res.json({
                success: true,
                data: metrics,
                message: 'Métricas de implementação recuperadas com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro ao buscar métricas de implementação: ${error.message}`, 'error');
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar métricas',
                message: error.message
            });
        }
    }

    static async getDocumentationMetrics(req, res) {
        try {
            const metrics = await Project.getDocumentationMetrics();
            return res.json({
                success: true,
                data: metrics,
                message: 'Métricas de documentação recuperadas com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro ao buscar métricas de documentação: ${error.message}`, 'error');
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar métricas',
                message: error.message
            });
        }
    }

    static async getTestingMetrics(req, res) {
        try {
            const metrics = await Project.getTestingMetrics();
            return res.json({
                success: true,
                data: metrics,
                message: 'Métricas de testes recuperadas com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro ao buscar métricas de testes: ${error.message}`, 'error');
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar métricas',
                message: error.message
            });
        }
    }
    static async getDeploymentMetrics(req, res) {
        try {
            const metrics = await Project.getDeploymentMetrics();
            return res.json({
                success: true,
                data: metrics,
                message: 'Métricas de deploy recuperadas com sucesso'
            });
        } catch (error) {
            logger.logToFile(`Erro ao buscar métricas de deploy: ${error.message}`, 'error');
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar métricas',
                message: error.message
            });
        }
    }
}