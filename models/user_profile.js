const Model = require("objection").Model;
require("./../objection");

//Import User class model for relationMappings()
const User = require("./users");

class UserProfile extends Model {
  static get tableName() {
    return "user_profile";
  }
  // defines the relations to other models.
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        ModelClass: UserProfile,
        join: {
          from: "user_profile.id",
          to: "users.id"
        }
      }
    };
  }
}

module.exports = User_profile;
