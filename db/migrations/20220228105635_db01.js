exports.up = function(knex, Promise) {
  return knex.raw(`
  
  
  DROP TABLE users;
  DROP TABLE blogs;
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
 
  DROP TABLE users;
  DROP TABLE blogs;
  
  `);
};
