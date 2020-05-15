exports.up = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_profile 
ADD handle VARCHAR (40) NOT NULL DEFAULT 'foo';`);
};

exports.down = function(knex, Promise) {
  return knex.raw(`ALTER TABLE user_profile 
ADD handle VARCHAR (40) NOT NULL DEFAULT 'foo';`);
};
