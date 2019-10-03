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
  return knex("users")
    .del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex("users").insert({
          username: "johnwick4",
          password: "test123",
          email: "john1@gmail.com",
          first_name: "jonathan",
          image_url:
            "https://res.cloudinary.com/dwsbpkgvr/image/upload/v1565765343/o7qsl7mmyw8nbqaaho0f.jpg",
          password: "test123",
          email: "john1@gmail.com",
          created_at: "2019-09-26T08:13:17.560Z",
          updated_at: "2019-09-26T08:13:17.560Z"
        })
      ]);
    });
};
