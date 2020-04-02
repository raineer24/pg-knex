const env = process.env.NODE_ENV || "development";
const Knex = require("knex");
const connection = require("./knexfile");
const { Model } = require("objection");

const knexConnection = Knex(connection[env]);

Model.knex(knexConnection);
