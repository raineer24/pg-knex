exports.up = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE user_profile ADD COLUMN user_id INTEGER PRIMARY KEY FOREIGN KEY () REFERENCES users (id);
               
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  ALTER TABLE user_profile ADD COLUMN user_id INTEGER PRIMARY KEY FOREIGN KEY () REFERENCES users (id); 
                

  `);
};
