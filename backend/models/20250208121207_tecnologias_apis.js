const knex = require('../database/knex');

class TecnologiasApis {
    static get tableName() {
        return 'tecnologias_apis';
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

    // Método adicional para buscar por nome da API
    static async getByNomeApi(nomeApi) {
        return knex(this.tableName)
            .where('nome_api', 'like', `%${nomeApi}%`)
            .select('*');
    }

    // Método para verificar se uma API já existe
    static async apiExists(nomeApi) {
        const api = await knex(this.tableName)
            .where('nome_api', nomeApi)
            .first();
        return !!api;
    }
}

module.exports = TecnologiasApis;