exports.up = function(knex, Promise) {
  return knex.raw(`CREATE TABLE IF NOT EXISTS user_skill_set 
  ( 
     user_skill_set_id SERIAL PRIMARY KEY, 
     skill_set_name TEXT[] NOT NULL, 
     FOREIGN KEY (user_skill_set_id) REFERENCES user_profile(id) 
  );`);
};

exports.down = function(knex, Promise) {
  return knex.raw(`CREATE TABLE IF NOT EXISTS user_skill_set 
  ( 
     user_skill_set_id SERIAL PRIMARY KEY, 
     skill_set_name TEXT[] NOT NULL, 
     FOREIGN KEY (user_skill_set_id) REFERENCES user_profile(id) 
  );`);
};
