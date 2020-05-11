const Model = require("objection").Model;
require("./../objection");
const _ = require("lodash");
const path = require("path");
const filePath = path.join(__dirname, "/user_profile.js");
console.log("DIRNAME", filePath);

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

  static sample() {
    $query;
  }

  $formatJson(obj) {
    obj = super.$formatJson(obj);
    console.log("obj", obj);

    obj.avatar = this.avatar;
    console.log("obj username: ", obj.username);

    return _.omit(obj, hiddenFields);
  }
  $beforeInsert(queryContext) {
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
