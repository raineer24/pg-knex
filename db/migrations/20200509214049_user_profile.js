exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_profile", table => {
    table.increments("id");
    table.string("company_name");
    table.string("website");
    table.string("job_location");
    table.string("status").notNullable();
    table.string("youtube_handle");
    table.string("twitter_handle");
    table.string("facebook_handle");
    table.string("instagram_handle");
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .integer("user_id")
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_profile");
};
