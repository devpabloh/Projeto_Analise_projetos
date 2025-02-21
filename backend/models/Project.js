import knex from '../database/knex.js';

export class Project {
    static async create(data) {
        // Define boolean fields
        const booleanFields = [
            'passou_por_testes',
            'deploy_automatizado',
            'deploy_estruturado',
            'implementado',
            'rollback_automatico',
            'possui_documentacao',
            'documentacao_atualizada',
            'suporte_disponivel'
        ];

        // Process the data
        const processedData = { ...data };
        booleanFields.forEach(field => {
            if (field in processedData) {
                processedData[field] = Boolean(processedData[field]);
            }
        });

        // Handle array fields
        if (processedData.tipos_testes && !Array.isArray(processedData.tipos_testes)) {
            processedData.tipos_testes = processedData.tipos_testes.split(',').map(item => item.trim());
        }
        if (processedData.tipos_documentos && !Array.isArray(processedData.tipos_documentos)) {
            processedData.tipos_documentos = processedData.tipos_documentos.split(',').map(item => item.trim());
        }

        return knex('projects').insert(processedData).returning('*');
    }

    static async getAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        
        const [count] = await knex('projects').count();
        const projects = await knex('projects')
            .select('*')
            .offset(offset)
            .limit(limit)
            .orderBy('created_at', 'desc');
    
        return {
            data: projects,
            total: parseInt(count.count),
            currentPage: page,
            totalPages: Math.ceil(parseInt(count.count) / limit)
        };
    }

    static async getById(id) {
        return knex('projects').where({ id }).first();
    }

    static async update(id, data) {
        // Define boolean fields
        const booleanFields = [
            'passou_por_testes',
            'deploy_automatizado',
            'deploy_estruturado',
            'implementado',
            'rollback_automatico',
            'possui_documentacao',
            'documentacao_atualizada',
            'suporte_disponivel'
        ];

        // Process the data
        const processedData = { ...data };
        booleanFields.forEach(field => {
            if (field in processedData) {
                processedData[field] = Boolean(processedData[field]);
            }
        });

        // Handle array fields
        if (processedData.tipos_testes && !Array.isArray(processedData.tipos_testes)) {
            processedData.tipos_testes = processedData.tipos_testes.split(',').map(item => item.trim());
        }
        if (processedData.tipos_documentos && !Array.isArray(processedData.tipos_documentos)) {
            processedData.tipos_documentos = processedData.tipos_documentos.split(',').map(item => item.trim());
        }

        return knex('projects')
            .where({ id })
            .update({
                ...processedData,
                updated_at: knex.fn.now()
            })
            .returning('*');
    }

    static async delete(id) {
        return knex('projects').where({ id }).del();
    }

    static async search(query) {
        return knex('projects')
            .where('nome_projeto', 'ilike', `%${query}%`)
            .orWhere('descricao_resumida', 'ilike', `%${query}%`)
            .orWhere('responsavel_nome', 'ilike', `%${query}%`)
            .orderBy('created_at', 'desc');
    }

    static async getStatistics() {
        const [totalCount] = await knex('projects').count();
        const [implementedCount] = await knex('projects').where('implementado', true).count();
        const [documentedCount] = await knex('projects').where('possui_documentacao', true).count();
        
        return {
            total: parseInt(totalCount.count),
            implemented: parseInt(implementedCount.count),
            documented: parseInt(documentedCount.count)
        };
    }
}