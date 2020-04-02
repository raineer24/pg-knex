// const environment = process.env.NODE_ENV || "development";
// const { Model } = require("objection");
// const config = require("./knexfile");
// const environmentConfig = config[environment];
// const knex = require("knex");
// const objection = knex(environmentConfig);
// Model.knex(objection);

// module.exports = objection;

// const env = process.env.NODE_ENV || "development";
// //const Knex = require("knex");
// const connection = require("./knexfile");
// const { Model } = require("objection").Model;

// const knexConnection = require("knex")(connection[env]);

// Model.knex(knexConnection);

// const env = process.env.NODE_ENV || "development";
// const knexfile = require("../knexfile");
// // eslint-disable-next-line import/order
// const knex = require("knex")(knexfile[env]);

const env = process.env.NODE_ENV || "development";
const Knex = require("knex");
const connection = require("./knexfile");
const { Model } = require("objection");

const knexConnection = Knex(connection[env]);

Model.knex(knexConnection);
