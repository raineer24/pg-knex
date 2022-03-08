exports.up = function(knex, Promise) {
  return knex.raw(`
  
  
  DROP TABLE users;
  
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
 
  DROP TABLE users;
  
  
  `);
};
