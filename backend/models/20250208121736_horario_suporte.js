const knex = require('../database/knex');

class HorarioSuporte {
    static get tableName() {
        return 'horario_suporte';
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

    // Método para buscar por tipo de horário
    static async getByTipoHorario(horario) {
        return knex(this.tableName)
            .where('horario', horario)
            .select('*');
    }

    // Método para contar registros por tipo de horário
    static async countByTipoHorario() {
        return knex(this.tableName)
            .select('horario')
            .count('* as total')
            .groupBy('horario');
    }
}

module.exports = HorarioSuporte;
