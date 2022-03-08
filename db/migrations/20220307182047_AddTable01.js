exports.up = function(knex, Promise) {
    return knex.raw(`
    CREATE TABLE IF NOT EXISTS users (
  id serial, 
  username varchar(128) NOT NULL, 
  first_name varchar(128) NOT NULL, 
  email varchar(128) NOT NULL UNIQUE, 
  password varchar(128) NOT NULL, 
  created_at timestamp WITH time zone NOT NULL DEFAULT now(), 
  updated_at timestamp WITH time zone NOT NULL DEFAULT now(), 
  image_url varchar(128), 
   PRIMARY KEY (id), 
   UNIQUE(id)
);
       CREATE TABLE IF NOT EXISTS user_profile (
  id serial, 
  users_id integer, 
  company_name varchar(40), 
  website varchar(40), 
  job_location varchar(40), 
  status varchar(40) NOT NULL, 
  bio varchar(128), 
  youtube_handle varchar(40), 
  twitter_handle varchar(40), 
  facebook_handle varchar(40), 
  instagram_handle varchar(40), 
  created_at timestamp WITH time zone NOT NULL DEFAULT now(), 
  updated_at timestamp WITH time zone NOT NULL DEFAULT now(), 
  PRIMARY KEY (id, users_id), 
  FOREIGN KEY (users_id) REFERENCES users (id), 
  UNIQUE(users_id)
);
CREATE TABLE IF NOT EXISTS user_experience_detail (
  user_experience_detail_id serial, 
  users_id integer REFERENCES user_profile(users_id), 
  job_title varchar(40) NOT NULL, 
  company_name varchar(40) NOT NULL, 
  job_location varchar(40), 
  start_date date NOT NULL, 
  end_date date, 
  CURRENT boolean DEFAULT false, 
  description text, 
  PRIMARY KEY (
    user_experience_detail_id, usersp_id
  )
);
CREATE TABLE IF NOT EXISTS user_skill_set (
  user_skill_set_id serial PRIMARY KEY, 
  skill_set_name json NOT NULL, 
  FOREIGN KEY (user_skill_set_id) REFERENCES user_profile(users_id)
);
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

CREATE TABLE IF NOT EXISTS post
(
id SERIAL,
users_id INTEGER,
title VARCHAR(100),
body TEXT NOT NULL,
publish_date TIMESTAMP with time zone NOT NULL DEFAULT now(),
PRIMARY KEY (id, users_id),
FOREIGN KEY (users_id) REFERENCES users (id),
UNIQUE(id)
);

      `);
  };
  
  exports.down = function(knex, Promise) {
    return knex.raw(`CREATE TABLE IF NOT EXISTS users (
  id serial, 
  username varchar(128) NOT NULL, 
  first_name varchar(128) NOT NULL, 
  email varchar(128) NOT NULL UNIQUE, 
  password varchar(128) NOT NULL, 
  created_at timestamp WITH time zone NOT NULL DEFAULT now(), 
  updated_at timestamp WITH time zone NOT NULL DEFAULT now(), 
  image_url varchar(128), 
    PRIMARY KEY (id), 
   UNIQUE(id)
);
       CREATE TABLE IF NOT EXISTS user_profile (
  id serial, 
  users_id integer, 
  company_name varchar(40), 
  website varchar(40), 
  job_location varchar(40), 
  status varchar(40) NOT NULL, 
  bio varchar(128), 
  youtube_handle varchar(40), 
  twitter_handle varchar(40), 
  facebook_handle varchar(40), 
  instagram_handle varchar(40), 
  created_at timestamp WITH time zone NOT NULL DEFAULT now(), 
  updated_at timestamp WITH time zone NOT NULL DEFAULT now(), 
  PRIMARY KEY (id, users_id), 
  FOREIGN KEY (users_id) REFERENCES users (id), 
  UNIQUE(users_id)
);
CREATE TABLE IF NOT EXISTS user_experience_detail (
  user_experience_detail_id serial, 
  usersp_id integer REFERENCES user_profile(users_id), 
  job_title varchar(40) NOT NULL, 
  company_name varchar(40) NOT NULL, 
  job_location varchar(40), 
  start_date date NOT NULL, 
  end_date date, 
  CURRENT boolean DEFAULT false, 
  description text, 
  PRIMARY KEY (
    user_experience_detail_id, usersp_id
  )
);
CREATE TABLE IF NOT EXISTS user_skill_set (
  user_skill_set_id serial PRIMARY KEY, 
  skill_set_name json NOT NULL, 
  FOREIGN KEY (user_skill_set_id) REFERENCES user_profile(users_id)
);
CREATE TABLE IF NOT EXISTS users (
  id serial, 
  username varchar(128) NOT NULL, 
  first_name varchar(128) NOT NULL, 
  email varchar(128) NOT NULL UNIQUE, 
  password varchar(128) NOT NULL, 
  created_at timestamp WITH time zone NOT NULL DEFAULT now(), 
  updated_at timestamp WITH time zone NOT NULL DEFAULT now(), 
  image_url varchar(128), 
  users_id integer, 
  PRIMARY KEY (id, users_id), 
  FOREIGN KEY (users_id) REFERENCES users (id), 
  UNIQUE(id)
);
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

CREATE TABLE IF NOT EXISTS post
(
id SERIAL,
users_id INTEGER,
title VARCHAR(100),
body TEXT NOT NULL,
publish_date TIMESTAMP with time zone NOT NULL DEFAULT now(),
PRIMARY KEY (id, users_id),
FOREIGN KEY (users_id) REFERENCES users (id),
UNIQUE(id)
);

      `);
  };
  