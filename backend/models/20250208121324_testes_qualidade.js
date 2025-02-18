const knex = require('../database/knex');

class TestesQualidade {
    static get tableName() {
        return 'testes_qualidade';
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

    // Métodos específicos para testes
    static async getByPassouTestes(passou) {
        return knex(this.tableName)
            .where('passou_por_testes', passou)
            .select('*');
    }

    static async getByTipoTeste(tipo) {
        return knex(this.tableName)
            .where('tipos_testes', 'like', `%${tipo}%`)
            .select('*');
    }
}

module.exports = TestesQualidade;