exports.up = function(knex, Promise) {
    return knex.raw(`
    DROP TABLE user_skill_set;
    DROP TABLE user_experience_detail;  
       DROP TABLE user_profile;
      `);
  };
  
  exports.down = function(knex, Promise) {
    return knex.raw(`
    DROP TABLE user_skill_set;
    DROP TABLE user_experience_detail;  
       DROP TABLE user_profile;
      `);
  };
  