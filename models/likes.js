const Model = require("objection").Model;
require("./../objection");
const path = require("path");

class Likes extends Model {
  static get tableName() {
    return "likes";
  }
 
  static get idColumn() {
    return ["likes_id"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      

      properties: {
        likes_id: { type: "integer" },
        users_id: { type: "integer" },
        post_id: { type: "integer" },
      }
    };
  }
}

module.exports = Likes;
