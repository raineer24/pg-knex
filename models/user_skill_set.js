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
        user_skill_set_id: { type: "integer" },
        skill_set_name: { type: "string" }
      }
    };
  }

  static get idColumn() {
    return ["user_skill_set_id"];
  }

  static get jsonAttributes() {
    return ["skill_set_name"];
  }

  // $formatJson(obj) {
  //   obj = super.$formatJson(obj);
  //   console.log("obj", obj.skill_set_name);

  //   obj.avatar = this.avatar;
  //   console.log("obj username: ", obj.skill_set_name);

  //   return _.omit(obj);
  // }
  $beforeInsert(queryContext) {
    console.log(queryContext);

    console.log("image url", this.image_url);

    // this.created_at = new Date().toISOString();
    if (this.password) {
      // this.password = makeHash(this.password);
      console.log(this.password);
    }
  }
  // $formatDatabaseJson(json) {
  //   // if (json.languages) {
  //   //   json.languages = lit(json.languages).asArray();
  //   // }
  //   let skills = json.skill_set_name;
  //   console.log("skills", skills);

  //   //obj = super.$formatDatabaseJson(json);
  //   //console.log("obj", obj);
  // }

  // $formatDatabaseJson(json) {
  //   if (json.languages) {
  //     json.languages = lit(json.languages).asArray();
  //   }

  //   return super.$formatDatabaseJson(json);
  // }

  $parseDatabaseJson(json) {
    // json = super.$parseDatabaseJson(json);
    //let location = json.location;
    let skills = json.skill_set_name;
    //console.log("skill", skills);

    // let x = JSON.stringify(skills);
    // let xx = JSON.parse(x);
    // console.log("xx", typeof xx.skills);

    // let x = JSON.parse(skills);
    // console.log("x");

    if (skills) {
      skills = JSON.parse(JSON.stringify(skills));
    }
    console.log("log", typeof skills);

    return Object.assign({}, json, { skills });
    // return super.$parseDatabaseJson(json);
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
