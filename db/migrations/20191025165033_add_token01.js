exports.up = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE users 
ADD emailVerified BOOLEAN;
ALTER TABLE users 
ADD tokenusedbefore BOOLEAN;
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  ALTER TABLE users 
ADD emailVerified BOOLEAN;
ALTER TABLE users 
ADD tokenusedbefore BOOLEAN;
  `);
};
