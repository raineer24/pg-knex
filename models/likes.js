const Model = require("objection").Model;
require("./../objection");
const path = require("path");

class Likes extends Model {
  static get tableName() {
    return "likes";
  }

  static get idColumn() {
    return ["likes_id"];
  }

  static get jsonSchema() {

    return {
      type: "object",


      properties: {
        likes_id: {
          type: "integer"
        },
        users_id: {
          type: "integer"
        },
        post_id: {
          type: "integer"
        },
        likedByMe: {
          type: "boolean"
        }
      }
    };
  }

  static get relationMappings() {
    const Users = require("./users");
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: Users,
        join: {
          from: 'post.id',
          through: {
            from: 'likes.post_id',
            to: 'likes.user_id',
          },
          to: 'users.id',
        },
      },
    };
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);
    let users_id = json.users_id;
    if (users_id) {
      users_id = JSON.parse(users_id);
    }
    return Object.assign({}, json, {
      users_id
    });

    //let location = json.location;

    //return json;
    //console.log("object json", Object.assign({}, json, { skills }));
    // return super.$parseDatabaseJson(json);
  }
}

module.exports = Likes;