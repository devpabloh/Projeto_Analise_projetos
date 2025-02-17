const knex = require('../database/knex');

class NormaConformidade {
    static get tableName() {
        return 'norma_conformidade';
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

    // Método para buscar por status de atendimento à norma
    static async getByAtendeNorma(status) {
        return knex(this.tableName)
            .where('atende_norma', status)
            .select('*');
    }

    // Método para buscar por norma específica
    static async getByNormaEspecifica(norma) {
        return knex(this.tableName)
            .whereRaw('? = ANY(quais_normas)', [norma])
            .select('*');
    }

    // Método para contar projetos por status de conformidade
    static async countByStatus() {
        return knex(this.tableName)
            .select('atende_norma')
            .count('* as total')
            .groupBy('atende_norma');
    }
}

module.exports = NormaConformidade;
  
