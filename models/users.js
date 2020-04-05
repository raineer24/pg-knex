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
        first_name: { type: "string", minLength: 1, maxLength: 40 },
        updated_at: { type: "string" },
        image_url: { type: "string", maxLength: 40 },
        token: { type: "string", maxLength: 40 },
        emailverified: { type: "string" },
        tokenusedbefore: { type: "string" }
      }
    };
  }

  $formatJson(obj) {
    obj = super.$formatJson(obj);
    obj.avatar = this.avatar;
    return _.omit(obj, hiddenFields);
  }
  $beforeInsert(queryContext) {
    this.created_at = new Date().toISOString();
    if (this.password) {
      this.password = makeHash(this.password);
    }
  }
}

module.exports = User;
/**
 * Generate a hash based on bcrypt algorithm
 * @param  {string} plainText input text string
 * @return {string}           hashed string
 */
const makeHash = plainText => {
  if (!plainText) return;
  return bcrypt.hashSync(plainText, bcrypt.genSaltSync(10));
};
