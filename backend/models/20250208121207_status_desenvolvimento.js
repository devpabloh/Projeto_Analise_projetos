const knex = require('../database/knex');

class StatusDesenvolvimento {
    static get tableName() {
        return 'status_desenvolvimento';
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

    // Método adicional para buscar por status
    static async getByStatus(status) {
        return knex(this.tableName)
            .where('status', status)
            .select('*');
    }

    // Método para buscar projetos por período
    static async getByPeriodo(dataInicial, dataFinal) {
        return knex(this.tableName)
            .whereBetween('data_inicial', [dataInicial, dataFinal])
            .orWhereBetween('data_final', [dataInicial, dataFinal])
            .select('*');
    }
}

module.exports = StatusDesenvolvimento;