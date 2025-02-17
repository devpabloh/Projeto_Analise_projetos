const knex = require('../database/knex');

class DeployEstruturado {
    static get tableName() {
        return 'deploy_estruturado';
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

    // Método adicional para buscar por status do processo de deploy
    static async getByProcessoDeploy(status) {
        return knex(this.tableName)
            .where('processo_deploy', status)
            .select('*');
    }
}

module.exports = DeployEstruturado;
