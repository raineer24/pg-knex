exports.up = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_skill_set 
ALTER COLUMN skill_set_name DROP DEFAULT;`);
};

exports.down = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_skill_set 
ALTER COLUMN skill_set_name DROP DEFAULT;`);
};
