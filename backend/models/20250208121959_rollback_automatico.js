const knex = require('../database/knex');

class RollbackAutomatico {
    static get tableName() {
        return 'rollback_automatico';
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

    // Método específico para buscar por status do rollback
    static async getByRollbackStatus(status) {
        return knex(this.tableName)
            .where('rollback', status)
            .select('*');
    }

    // Método para buscar por projeto
    static async getByProjetoId(projetoId) {
        return knex(this.tableName)
            .where('projeto_id', projetoId)
            .first();
    }
}

module.exports = RollbackAutomatico;