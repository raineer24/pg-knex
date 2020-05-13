exports.up = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_profile DROP handle;`);
};

exports.down = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_profile DROP handle;`);
};
