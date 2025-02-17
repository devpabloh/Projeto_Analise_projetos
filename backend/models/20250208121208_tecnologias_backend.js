const knex = require('../database/knex');

class TecnologiasBackend {
    static get tableName() {
        return 'tecnologias_backend';
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

    // Método adicional para buscar por nome da tecnologia
    static async getByNomeBackend(nomeBackend) {
        return knex(this.tableName)
            .where('nome_backend', 'like', `%${nomeBackend}%`)
            .select('*');
    }

    // Método para verificar se uma tecnologia já existe
    static async backendExists(nomeBackend) {
        const backend = await knex(this.tableName)
            .where('nome_backend', nomeBackend)
            .first();
        return !!backend;
    }
}

module.exports = TecnologiasBackend;