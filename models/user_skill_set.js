const Model = require("objection").Model;
require("./../objection");

class UserSkillSet extends Model {
  skill_set_name: Array<string>;
  static get tableName() {
    return "user_skill_set";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        skill_set_name: { type: "array" }
      }
    };
  }

  static get jsonAttributes() {
    return ["skill_set_name"];
  }

  static get relationMappings() {
    const User = require("./user_profile");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "user_skill_set.user_skill_set_id",
          to: "users.id"
        }
      }
    };
  }
}

module.exports = UserSkillSet;
