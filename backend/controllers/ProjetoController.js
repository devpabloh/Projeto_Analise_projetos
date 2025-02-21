import { Project } from '../models/Project.js';

export class ProjetoController {
    static async create(req, res) {
        try {
            const [project] = await Project.create(req.body);
            return res.status(201).json({
                success: true,
                data: project,
                message: 'Projeto criado com sucesso'
            });
        } catch (error) {
            console.error('Erro ao criar projeto:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro interno do servidor',
                message: error.message
            });
        }
    }

    static async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const projects = await Project.getAll(page, limit);
            
            return res.json({
                success: true,
                ...projects,
                message: 'Projetos recuperados com sucesso'
            });
        } catch (error) {
            console.error('Erro ao buscar projetos:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar projetos',
                message: error.message
            });
        }
    }

    static async getById(req, res) {
        try {
            const project = await Project.getById(req.params.id);
            if (!project) {
                return res.status(404).json({
                    success: false,
                    error: 'Projeto não encontrado'
                });
            }
            return res.json({
                success: true,
                data: project,
                message: 'Projeto encontrado com sucesso'
            });
        } catch (error) {
            console.error('Erro ao buscar projeto:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro ao buscar projeto',
                message: error.message
            });
        }
    }

    static async update(req, res) {
        try {
            const [project] = await Project.update(req.params.id, req.body);
            if (!project) {
                return res.status(404).json({
                    success: false,
                    error: 'Projeto não encontrado'
                });
            }
            return res.json({
                success: true,
                data: project,
                message: 'Projeto atualizado com sucesso'
            });
        } catch (error) {
            console.error('Erro ao atualizar projeto:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro ao atualizar projeto',
                message: error.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const deleted = await Project.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: 'Projeto não encontrado'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Projeto excluído com sucesso'
            });
        } catch (error) {
            console.error('Erro ao excluir projeto:', error);
            return res.status(500).json({
                success: false,
                error: 'Erro ao excluir projeto',
                message: error.message
            });
        }
    }
}