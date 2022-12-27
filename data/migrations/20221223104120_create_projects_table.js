/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("projects", tbl => {
        tbl.increments('id').unsigned().primary();
        tbl.text('project_id').notNullable();
        tbl.text('api_key').notNullable();
        tbl.integer('user_id').notNullable();
        tbl.datetime('project_created_date').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
