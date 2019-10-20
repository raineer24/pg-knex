exports.up = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE users 
DROP COLUMN email;

  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
   ALTER TABLE "users"
ALTER TABLE blogs DROP COLUMN email;

  `);
};
