const knex = require('../database/knex');

class DocumentacaoTecnica {
    static get tableName() {
        return 'documentacao_tecnica';
    }

    static async getAll() {
        return knex(this.tableName).select('*');
    }

    static async getById(id) {
        return knex(this.tableName).where('id', id).first();
    }

    static async create(data) {
        return knex(this.tableName).insert(data).returning('*');
    }

    static async update(id, data) {
        return knex(this.tableName).where('id', id).update(data).returning('*');
    }

    static async delete(id) {
        return knex(this.tableName).where('id', id).del();
    }

    // Método para buscar por status de documentação
    static async getByStatusDocumentacao(temDocumentacao) {
        return knex(this.tableName)
            .where('tem_documentacao_tecnica', temDocumentacao)
            .select('*');
    }

    // Método para buscar por tipo específico de documentação
    static async getByTipoDocumentacao(tipo) {
        return knex(this.tableName)
            .whereRaw('? = ANY(tipos_documentacao_tecnica)', [tipo])
            .select('*');
    }
}

module.exports = DocumentacaoTecnica;