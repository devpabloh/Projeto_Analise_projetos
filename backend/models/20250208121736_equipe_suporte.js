const knex = require('../database/knex');

class EquipeESuporte {
    static get tableName() {
        return 'equipe_suporte';
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

    // Métodos específicos para equipe e suporte
    static async getByLiderTecnico(nome) {
        return knex(this.tableName)
            .where('lider_tecnico', nome)
            .select('*');
    }

    static async getByGerenteProjeto(nome) {
        return knex(this.tableName)
            .where('gerente_projeto', nome)
            .select('*');
    }

    static async getByResponsavelSuporte(nome) {
        return knex(this.tableName)
            .where('responsavel_suporte', nome)
            .select('*');
    }

    static async getByProjetoId(projetoId) {
        return knex(this.tableName)
            .where('projeto_id', projetoId)
            .first();
    }
}

module.exports = EquipeESuporte;