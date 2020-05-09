exports.up = function(knex, Promise) {
  return knex.raw(`
   drop table users
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  drop table users
  `);
};
