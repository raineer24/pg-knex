exports.up = function(knex, Promise) {
  return knex.raw(`
    DELETE FROM users;
               
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  DELETE FROM users;
                

  `);
};
