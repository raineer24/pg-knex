exports.up = function(knex, Promise) {
  return knex.raw(`
  DROP TABLE user_profile 
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  DROP TABLE user_profile
  `);
};
