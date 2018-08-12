
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('population').del()
    .then(function () {
      // Inserts seed entries
      return knex('population').insert([
        {id: 1, name: 'New Zealand', '1950': 1, '1951': 2}
      ]);
    });
};
