exports.up = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE users ALTER COLUMN email SET DEFAULT '_blank';
               
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  ALTER TABLE users ALTER COLUMN email SET DEFAULT '_blank'; 
                

  `);
};
