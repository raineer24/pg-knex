const Model = require("objection").Model;
require("./../objection");
class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],
      properties: {
        id: { type: "string" },
        password: { type: "string" },
        email: { type: "string", format: "email", maxLength: 30 },
        first_name: { type: "string", minLength: 1, maxLength: 40 },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        image_url: { type: "string", maxLength: 40 },
        token: { type: "string", maxLength: 40 },
        emailverified: { type: "string" },
        tokenusedbefore: { type: "string" }
      }
    };
  }
}

module.exports = User;
