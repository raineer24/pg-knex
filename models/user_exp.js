const Model = require("objection").Model;
require("./../objection");
const path = require("path");

class UserExperience extends Model {
  static get tableName() {
    return "user_experience_detail";
  }
  // defines the relations to other models.
  // static get relationMappings() {
  //   //Import User class model for relationMappings()
  //   const User = require("./user_profile");

  //   return {
  //     user: {
  //       relation: Model.BelongsToOneRelation,
  //       ModelClass: require("./user_profile").default,
  //       join: {
  //         from: "user_profile.id",
  //         to: "users.id"
  //       }
  //     }
  //   };
  // }

  static get idColumn() {
    return ["user_experience_detail_id"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["job_title", "company_name", "start_date"],

      properties: {
        user_experience_detail_id: { type: "integer" },
        job_title: { type: "string" },
        company_name: { type: "string" },
        job_location: { type: "string" },
        start_date: { type: "string" },
        end_date: { type: "string" },
        current: { type: "boolean" },
        description: { type: "string" }
      }
    };
  }
}

module.exports = UserExperience;
