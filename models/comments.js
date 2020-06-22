const Model = require("objection").Model;
require("./../objection");
const path = require("path");

class Comments extends Model {
    static get tableName() {
        return "comments";
    }

    static get idColumn() {
        return ["comments_id"];
    }

    static get jsonSchema() {

        return {
            type: "object",


            properties: {
                comments_id: {
                    type: "integer"
                },
                users_id: {
                    type: "integer"
                },
                post_id: {
                    type: "integer"
                },
                body: {
                    type: "string"
                },
                publish_date: {
                    type: 'string',
                    format: 'date-time'
                }
            }
        };
    }

    // static get relationMappings() {
    //     const Users = require("./users");
    //     return {
    //         users: {
    //             relation: Model.ManyToManyRelation,
    //             modelClass: Users,
    //             join: {
    //                 from: 'post.id',
    //                 through: {
    //                     from: 'likes.post_id',
    //                     to: 'likes.user_id',
    //                 },
    //                 to: 'users.id',
    //             },
    //         },
    //     };
    // }

    // $parseDatabaseJson(json) {
    //     json = super.$parseDatabaseJson(json);
    //     let users_id = json.users_id;
    //     if (users_id) {
    //         users_id = JSON.parse(users_id);
    //     }
    //     return Object.assign({}, json, {
    //         users_id
    //     });

    //     //let location = json.location;

    //     //return json;
    //     //console.log("object json", Object.assign({}, json, { skills }));
    //     // return super.$parseDatabaseJson(json);
    // }


    // Topic.relationMappings = {
    //     comments: {
    //         relation: Model.OneToManyRelation,
    //         modelClass: Comment,
    //         // Extra filter query for the relation. This can be a hash of `{column: 'value'}` pairs
    //         // or a function that takes a query builder as a parameter.
    //         filter: {
    //             commentable: 'Topic'
    //         },
    //         join: {
    //             from: 'Topic.id',
    //             to: 'Comment.commentableId'
    //         }
    //     }
    // };

    // Profile.relationMappings = {
    //     comments: {
    //         relation: Model.OneToManyRelation,
    //         modelClass: Comment,
    //         filter: {
    //             commentable: 'Profile'
    //         },
    //         join: {
    //             from: 'Profile.id',
    //             to: 'Comment.commentableId'
    //         }
    //     }
    // };
}

module.exports = Comments;