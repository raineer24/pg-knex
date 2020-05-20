const Model = require("objection").Model;
require("./../objection");
const path = require("path");

class UserEducation extends Model {
  static get tableName() {
    return "user_education_detail";
  }
  static get idColumn() {
    return ["user_education_detail_id"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "major_fieldofstudy",
        "school_name",
        "start_date",
        "degree_name"
      ],

      properties: {
        user_experience_detail_id: { type: "integer" },
        school_name: { type: "string" },
        degree_name: { type: "string" },
        major_fieldofstudy: { type: "string" },
        start_date: { type: "string" },
        end_date: { type: "string" },
        current: { type: "boolean" },
        description: { type: "string" }
      }
    };
  }
}

module.exports = UserEducation;
