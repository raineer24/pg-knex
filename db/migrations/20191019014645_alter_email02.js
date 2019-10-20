exports.up = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE users 
ADD email VARCHAR (50) UNIQUE;
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  ALTER TABLE users ADD email email VARCHAR (50) UNIQUE;

  `);
};
