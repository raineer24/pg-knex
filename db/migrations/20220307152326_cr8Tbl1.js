exports.up = function(knex, Promise) {
    return knex.raw(`
       CREATE TABLE IF NOT EXISTS user_education_detail (
  user_education_detail_id SERIAL, 
  users_id INTEGER REFERENCES user_profile(users_id), 
  school_name VARCHAR(40) NOT NULL, 
  degree_name VARCHAR(40) NOT NULL, 
  major_fieldofstudy VARCHAR(40) NOT NULL, 
  start_date date NOT NULL, 
  end_date date, 
  current boolean DEFAULT FALSE, 
  description text, 
  PRIMARY KEY (
    user_education_detail_id, users_id
  )
);

      `);
  };
  
  exports.down = function(knex, Promise) {
    return knex.raw(`
       CREATE TABLE IF NOT EXISTS user_education_detail (
  user_education_detail_id SERIAL, 
  users_id INTEGER REFERENCES user_profile(users_id), 
  school_name VARCHAR(40) NOT NULL, 
  degree_name VARCHAR(40) NOT NULL, 
  major_fieldofstudy VARCHAR(40) NOT NULL, 
  start_date date NOT NULL, 
  end_date date, 
  current boolean DEFAULT FALSE, 
  description text, 
  PRIMARY KEY (
    user_education_detail_id, users_id
  )
);

      `);
  };
  