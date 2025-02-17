const knex = require('../database/knex');

class SuporteTecnicoDisponivel {
    static get tableName() {
        return 'suporte_tecnico_disponivel';
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

    // Método para buscar por disponibilidade de suporte
    static async getByDisponibilidade(existeSuporte) {
        return knex(this.tableName)
            .where('existe_suporte', existeSuporte)
            .select('*');
    }

    // Método para contar projetos por disponibilidade de suporte
    static async countByDisponibilidade() {
        return knex(this.tableName)
            .select('existe_suporte')
            .count('* as total')
            .groupBy('existe_suporte');
    }
}

module.exports = SuporteTecnicoDisponivel;