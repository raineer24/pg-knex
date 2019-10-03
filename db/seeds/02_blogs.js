// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('table_name').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
//       ]);
//     });
// };
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("blogs")
    .del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex("blogs").insert({
          title: "avengers end game",
          content: "the last sage",
          image_url: "https://i.imgur.com/jGGnBKH.jpg",
          created_at: "2019-08-14T07:11:28.350Z",
          updated_at: "2019-08-14T07:11:28.350Z"
        })
      ]);
    });
};
