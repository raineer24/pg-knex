const Model = require("objection").Model;
require("./../objection");
const path = require("path");
const filePath = path.join(__dirname, "/users.js");

class UserProfile extends Model {
  static get tableName() {
    return "user_profile";
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

  static get relationMappings() {
    const User = require("./users");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "user_profile.user_id",
          to: "users.id"
        }
      }
    };
  }
}

module.exports = UserProfile;
