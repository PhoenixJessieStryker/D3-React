exports.up = function(knex, Promise) {
  return knex.schema.createTable('population', table => {
    table.increments('id').primary()
    table.string('name')
    for (let i = 1950; i <= 2018; i++) {
      table.integer('' + i)
    }
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('population')
};
