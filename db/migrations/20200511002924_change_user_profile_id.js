exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_profile", table => {
    table
      .increments("user_profile_id")
      .references("id")
      .inTable("users");
    table.string("company_name");
    table.string("website");
    table.string("job_location");
    table.string("status").notNullable();
    table.string("bio");
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
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable("user_profile", table => {
    table
      .increments("user_profile_id")
      .references("id")
      .inTable("users");
    table.string("company_name");
    table.string("website");
    table.string("job_location");
    table.string("status").notNullable();
    table.string("bio");
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
  });
};
