export const up = function(knex) {
  return knex.schema.createTable('project_activities', table => {
      table.increments('id').primary();
      table.integer('project_id').references('id').inTable('projects').onDelete('CASCADE');
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.enu('action_type', ['create', 'update', 'delete']).notNullable();
      table.text('description').notNullable();
      table.jsonb('changes');
      table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

export const down = function(knex) {
  return knex.schema.dropTable('project_activities');
};