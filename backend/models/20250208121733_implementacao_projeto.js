const knex = require('../database/knex');

class ImplementacaoProjeto {
    static get tableName() {
        return 'implementacao_projeto';
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

    // Método para buscar por ambiente específico
    static async getByAmbiente(ambiente) {
        return knex(this.tableName)
            .where('ambiente', ambiente)
            .select('*');
    }

    // Método para contar projetos por ambiente
    static async countByAmbiente() {
        return knex(this.tableName)
            .select('ambiente')
            .count('* as total')
            .groupBy('ambiente');
    }
}

module.exports = ImplementacaoProjeto;
