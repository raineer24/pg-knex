const Model = require("objection").Model;
require("./../objection");
const path = require("path");

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

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        company_name: { type: "string" },
        website: { type: "string" },
        job_location: { type: "string" },
        status: { type: "string" },
        bio: { type: "string" },
        youtube_handle: { type: "string" },
        twitter_handle: { type: "string" },
        facebook_handle: { type: "string" },
        instagram_handle: { type: "string" }
      }
    };
  }

  static get relationMappings() {
    const UserSkillSet = require("./user_skill_set");
    const Users = require("./users");
    const UserExperience = require("./user_exp");
    return {
      // user_experience: {
      //   relation: Model.ManyToManyRelation,
      //   modelClass: UserExperience,
      //   from: "users.id",
      //   through: {
      //     from: "user_profile.id",
      //     to: "user_profile.id"
      //   },
      //   to: "user_experience_detail.user_experience_detail_id"
      // },
      user_skill_set: {
        relation: Model.HasManyRelation,
        modelClass: UserSkillSet,
        join: {
          from: "user_profile.id",
          to: "user_skill_set.user_skill_set_id"
        }
      },
      // user_profile: {
      //   relation: Model.HasManyRelation,
      //   modelClass: UserProfile,
      //   join: {
      //     from: "users.id",
      //     to: "user_profile.id"
      //   }
      // },
      user_experience: {
        relation: Model.ManyToManyRelation,
        modelClass: UserExperience,
        join: {
          from: "user_profile.id",
          through: {
            from: "user_profile.id",
            to: "user_profile.id"
          },
          to: "user_experience_detail.users_id"
        }
      }
    };
  }
}

module.exports = UserProfile;
