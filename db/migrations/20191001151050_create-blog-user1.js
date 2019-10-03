exports.up = function(knex, Promise) {
  return knex.raw(`CREATE TABLE IF NOT EXISTS
      blogs(
        blog_id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        content VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        user_id INTEGER REFERENCES  users(id)
      )`);
};

exports.down = function(knex, Promise) {
  return knex.raw(`CREATE TABLE IF NOT EXISTS
      blogs(
        blog_id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        content VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        user_id INTEGER REFERENCES  users(id)
      )`);
};
