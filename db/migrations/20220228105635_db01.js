exports.up = function(knex, Promise) {
  return knex.raw(`
  
  DROP TABLE blogs;
  DROP TABLE users;
  
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  DROP TABLE blogs;
  DROP TABLE users;
  
  
  `);
};
