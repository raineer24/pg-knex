const Model = require("objection").Model;
require("./../objection");
const path = require("path");

class Post extends Model {
  static get tableName() {
    return "post";
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

//   static get idColumn() {
//     return ["user_experience_detail_id"];
//   }

  static get jsonSchema() {
    return {
      type: "object",
      //required: ["job_title", "company_name", "start_date"],

      properties: {
        id: { type: "integer" },
        users_id: { type: "integer" },
        title: { type: "string" },
        body: { type: "string" },
        publish_date: { type: "string" },
      }
    };
  }
}

module.exports = Post;
