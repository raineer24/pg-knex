const Model = require("objection").Model;
require("./../objection");
const _ = require("lodash");

const hiddenFields = ["password", "created_at", "updated_at"];

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
        first_name: { type: "string", minLength: 3, maxLength: 40 },
        updated_at: { type: "string" },
        image_url: { type: "string" },
        token: { type: "string", maxLength: 40 },
        emailverified: { type: "string" },
        tokenusedbefore: { type: "string" }
      }
    };
  }

  static get relationMappings() {
    const UserProfile = require("./user_profile");
    const UserSkillSet = require("./user_skill_set");
    const UserExperience = require("./user_exp");
    const UserEducation = require("./user_edu");
    return {
      user_profile: {
        relation: Model.HasManyRelation,
        modelClass: UserProfile,
        join: {
          from: "users.id",
          to: "user_profile.users_id"
        }
      },
      user_skill: {
        relation: Model.ManyToManyRelation,
        modelClass: UserSkillSet,
        join: {
          from: "users.id",
          through: {
            from: "user_profile.users_id",
            to: "user_profile.users_id"
          },
          to: "user_skill_set.users_id"
        }
      },
      user_experience: {
        relation: Model.ManyToManyRelation,
        modelClass: UserExperience,
        join: {
          from: "users.id",
          through: {
            from: "user_profile.users_id",
            to: "user_profile.users_id"
          },
          to: "user_experience_detail.users_id"
        }
      },
      user_education: {
        relation: Model.ManyToManyRelation,
        modelClass: UserEducation,
        join: {
          from: "users.id",
          through: {
            from: "user_profile.users_id",
            to: "user_profile.users_id"
          },
          to: "user_education_detail.users_id"
        }
      }
    };
  }

  //   join: {
  //   from: projects
  //   throught: {
  //     join: {
  //       from: project_memberships
  //       to: project_membership_roles
  //   }
  //   to: roles
  // }

  // projects -> project_members -> project_member_roles -> roles

  // select "projects"."id" as "id", "projects"."name" as "name", "role"."id" as "role:id", "role"."created_by" as "role:created_by", "role"."updated_by" as "role:updated_by",
  // "role"."created_at" as "role:created_at",
  // "role"."updated_at" as "role:updated_at",
  // "role"."name" as "role:name",
  // "role"."slug" as "role:slug",
  // from "projects"
  // left join "projects_memberships_roles" as "role_join" on "role_join"."project_id" = "projects"."id"
  // left join (select "roles".* from "roles" where "membership_id" = $1) as "role" on "role_join"."role_id" = "role"."id"
  // where "projects"."account_id" = $2 - column "membership_id" does not exist"

  // // in Project:
  // projectMembership: {
  //   relation: BaseModel.HasOneRelation,
  //   modelClass: "ProjectMembership",
  //   join: {
  //     from: "projects.id",
  //     to: "project_memberships.projectId"
  //   }
  // };
  // // in ProjectMembership
  // role: {
  //   relation: BaseModel.HasOneThroughRelation,
  //   modelClass: "Role",
  //   join: {
  //     from: "project_memberships.id",
  //     through: {
  //       from: "project_membership_roles.projectMembershipId",
  //       to: "project_membership_roles.roleId"
  //     },
  //     to: "roles.id"
  //   }
  // };

  // Project.query()
  // .eager('projectMembership.role.permissions')
  // .modifyEager('projectMembership', builder => builder.where('membershipId', identity.id))

  static sample() {
    $query;
  }

  $formatJson(obj) {
    obj = super.$formatJson(obj);
    console.log("obj", obj);

    obj.avatar = this.avatar;
    console.log("obj username: ", obj.first_name);

    return _.omit(obj, hiddenFields);
  }
  $beforeInsert(queryContext) {
    console.log("this.username", this.username);

    console.log("image url", this.image_url);

    // this.created_at = new Date().toISOString();
    if (this.password) {
      // this.password = makeHash(this.password);
      console.log(this.password);
    }
  }
}

module.exports = User;
// /**
//  * Generate a hash based on bcrypt algorithm
//  * @param  {string} plainText input text string
//  * @return {string}           hashed string
//  */
// const makeHash = plainText => {
//   if (!plainText) return;
//   return bcrypt.hashSync(plainText, bcrypt.genSaltSync(10));
// };
