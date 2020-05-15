exports.up = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_skill_set 
ADD skill_set_name json NOT NULL default '{}'::json;`);
};

exports.down = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_skill_set 
ADD skill_set_name json NOT NULL default '{}'::json;`);
};
