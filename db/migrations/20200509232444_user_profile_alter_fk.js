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
//     ALTER TABLE user_profile drop column user_id;
               
//   `);
// };

// exports.down = function(knex, Promise) {
//   return knex.raw(`
//     ALTER TABLE user_profile drop column user_id;
               
//   `);
// };
