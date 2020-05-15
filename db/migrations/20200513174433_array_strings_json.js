exports.up = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_skill_set DROP skill_set_name;`);
};

exports.down = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_skill_set DROP skill_set_name;`);
};
