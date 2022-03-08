exports.up = function(knex, Promise) {
  return knex.raw(`
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
  return knex.raw(`
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
