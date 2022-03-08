exports.up = function(knex, Promise) {
  return knex.raw(`
  DROP TABLE user_education_detail;
  DROP TABLE user_skill_set;
  DROP TABLE user_experience_detail;
   DROP TABLE user_profile;
  DROP TABLE post;
  DROP TABLE users;
  
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  DROP TABLE user_education_detail;
  DROP TABLE user_skill_set;
  DROP TABLE user_experience_detail;
  DROP TABLE user_profile;
  DROP TABLE post;
  DROP TABLE users;
  
  
  `);
};
