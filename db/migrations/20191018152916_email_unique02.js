exports.up = function(knex, Promise) {
  return knex.raw(`
    
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
 
  `);
};
// exports.up = function(knex, Promise) {
//   return knex.raw(`
//     ALTER TABLE users 
// ADD email VARCHAR(128) UNIQUE;
//   `);
// };

// exports.down = function(knex, Promise) {
//   return knex.raw(`
//    ALTER TABLE users 
// ADD email VARCHAR(128) UNIQUE;
//   `);
// };
