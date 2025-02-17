const knex = require('../database/knex');

class InformacoesGerais {
    static get tableName() {
        return 'informacoes_gerais';
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

    // Método adicional para buscar por nome do projeto
    static async getByNomeProjeto(nomeProjeto) {
        return knex(this.tableName)
            .where('nome_projeto', 'like', `%${nomeProjeto}%`)
            .select('*');
    }
}

module.exports = InformacoesGerais;