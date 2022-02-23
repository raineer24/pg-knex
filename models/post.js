const Model = require("objection").Model;
require("./../objection");
const path = require("path");

class Post extends Model {
  static get tableName() {
    return "post";
  }


  static get jsonSchema() {
    return {
      type: "object",
      //required: ["job_title", "company_name", "start_date"],

      properties: {
        id: {
          type: "integer"
        },
        users_id: {
          type: "integer"
        },
        title: {
          type: "string"
        },
        body: {
          type: "string"
        },
        image_url: {
          type: "string"
        },
        publish_date: {
          type: "string"
        },
      }
    };
  }

  static get relationMappings() {
    const Likes = require("./likes");
    const Users = require("./users");
    return {
      // likes: {
      //   relation: Model.ManyToManyRelation,
      //   modelClass: Likes,
      //   join: {
      //     from: 'post.id',
      //     through: {
      //       from: 'post.id',
      //       to: 'post.id',
      //     },
      //     to: 'likes.post_id',
      //   },
      // },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: Likes,
        join: {
          from: "post.id",
          to: "likes.post_id"
        }
      },
    };
  }
}

module.exports = Post;