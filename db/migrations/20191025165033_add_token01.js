exports.up = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE users 
ADD token VARCHAR (128) UNIQUE;
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  ALTER TABLE users ADD token VARCHAR (128) UNIQUE;

  `);
};
