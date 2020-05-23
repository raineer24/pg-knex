exports.up = function(knex, Promise) {
  return knex.raw(`
  DROP TABLE user_experience_detail;
    `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
  DROP TABLE user_experience_detail;
      `);
};
