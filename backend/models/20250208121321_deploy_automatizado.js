const knex = require('../database/knex');

class DeployAutomatizado {
    static get tableName() {
        return 'deploy_automatizado';
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
}

module.exports = DeployAutomatizado;
