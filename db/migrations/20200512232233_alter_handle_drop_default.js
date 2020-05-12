exports.up = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_profile ALTER COLUMN handle DROP DEFAULT;`);
};

exports.down = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_profile ALTER COLUMN handle DROP DEFAULT;`);
};
