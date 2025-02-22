import { Project } from '../models/Project.js';
import { cacheManager } from '../utils/cache.js';
import { logger } from '../utils/logger.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';

export class ProjetoController {
    // ... existing create, getAll, getById, update, and delete methods ...

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
}