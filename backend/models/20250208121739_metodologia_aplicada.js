const knex = require('../database/knex');

class MetodologiaAplicada {
    static get tableName() {
        return 'metodologia_aplicada';
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

    // Método para buscar por metodologia específica
    static async getByMetodologia(metodologia) {
        return knex(this.tableName)
            .where('metodologia', metodologia)
            .select('*');
    }

    // Método para contar projetos por metodologia
    static async countByMetodologia() {
        return knex(this.tableName)
            .select('metodologia')
            .count('* as total')
            .groupBy('metodologia');
    }
}

module.exports = MetodologiaAplicada;
  
