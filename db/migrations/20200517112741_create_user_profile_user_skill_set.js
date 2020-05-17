exports.up = function(knex, Promise) {
  return knex.raw(`CREATE TABLE IF NOT EXISTS user_profile 
             ( 
                          id SERIAL PRIMARY KEY, 
                          users_id                  INTEGER, 
                          company_name              VARCHAR(40), 
                          website                   VARCHAR(40), 
                          job_location              VARCHAR(40), 
                          status                    VARCHAR(40) NOT NULL, 
                          bio                       VARCHAR(128), 
                          youtube_handle            VARCHAR(40), 
                          twitter_handle            VARCHAR(40), 
                          facebook_handle           VARCHAR(40), 
                          instagram_handle          VARCHAR(40), 
                          created_at TIMESTAMP with time zone NOT NULL DEFAULT now(), 
                          updated_at timestamp WITH time zone NOT NULL DEFAULT now(), 
                          FOREIGN KEY (users_id) REFERENCES users (id) 
             );CREATE TABLE IF NOT EXISTS user_skill_set 
             ( 
                          user_skill_set_id SERIAL PRIMARY KEY, 
                          user_profile_id INTEGER, 
                          skill_set_name JSON NOT NULL, 
                          FOREIGN KEY (user_profile_id) REFERENCES user_profile(id) 
             );`);
};

exports.down = function(knex, Promise) {
  return knex.raw(`CREATE TABLE IF NOT EXISTS user_profile 
             ( 
                          id SERIAL PRIMARY KEY, 
                          users_id                  INTEGER, 
                          company_name              VARCHAR(40), 
                          website                   VARCHAR(40), 
                          job_location              VARCHAR(40), 
                          status                    VARCHAR(40) NOT NULL, 
                          bio                       VARCHAR(128), 
                          youtube_handle            VARCHAR(40), 
                          twitter_handle            VARCHAR(40), 
                          facebook_handle           VARCHAR(40), 
                          instagram_handle          VARCHAR(40), 
                          created_at TIMESTAMP with time zone NOT NULL DEFAULT now(), 
                          updated_at timestamp WITH time zone NOT NULL DEFAULT now(), 
                          FOREIGN KEY (users_id) REFERENCES users (id) 
             );
             
             CREATE TABLE IF NOT EXISTS user_skill_set 
             ( 
                          user_skill_set_id SERIAL PRIMARY KEY, 
                          user_profile_id INTEGER, 
                          skill_set_name JSON NOT NULL, 
                          FOREIGN KEY (user_profile_id) REFERENCES user_profile(id) 
             );`);
};
