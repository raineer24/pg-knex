const Model = require("objection").Model;
require("./../objection");
const _ = require("lodash");

class UserSkillSet extends Model {
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

  $formatJson(obj) {
    obj = super.$formatJson(obj);
    console.log("obj", obj);

    obj.avatar = this.avatar;
    console.log("obj username: ", obj.skill_set_name);

    return _.omit(obj);
  }
  $beforeInsert(queryContext) {
    console.log(queryContext);

    console.log("image url", this.image_url);

    // this.created_at = new Date().toISOString();
    if (this.password) {
      // this.password = makeHash(this.password);
      console.log(this.password);
    }
  }
  $formatDatabaseJson(json) {
    // if (json.languages) {
    //   json.languages = lit(json.languages).asArray();
    // }

    obj = super.$formatDatabaseJson(json);
    console.log("obj", obj);
  }

  // static get relationMappings() {
  //   const User = require("./user_profile");
  //   return {
  //     user: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: User,
  //       join: {
  //         from: "user_skill_set.user_skill_set_id",
  //         to: "users.id"
  //       }
  //     }
  //   };
  // }
}

module.exports = UserSkillSet;
