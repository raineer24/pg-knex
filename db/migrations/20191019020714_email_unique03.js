exports.up = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE users ALTER COLUMN email SET NOT NULL;
               
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  ALTER TABLE users ALTER COLUMN email SET NOT NULL; 
                

  `);
};
