exports.up = function(knex, Promise) {
  return knex.raw(`CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(128) NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      )`);
};

exports.down = function(knex, Promise) {
  return knex.raw(`CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(128) NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      )`);
};
