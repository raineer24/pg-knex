// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex("user_profile")
//     .del()
//     .then(function() {
//       return Promise.all([
//         // Inserts seed entries
//         knex("user_profile").insert({
//           company_name: "Umbrella Company III",
//           website: "umbrellacorp.uk.tk",
//           job_location: "Wuhan, China",
//           bio: "Don't sleep on me",
//           status: "doctor",
//           youtube_handle: "joe24xtv",
//           twitter_handle: "@joe24xtv",
//           facebook_handle: "joe24xtv/fb",
//           instagram_handle: "joe24xtvIG"
//         })
//       ]);
//     });
// };
const user_profile = require("../data/user_profile");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("user_profile")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user_profile").insert(user_profile);
    });
};
