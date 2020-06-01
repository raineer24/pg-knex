// exports.up = function(knex, Promise) {
//   return knex.raw(`
//   CREATE TABLE IF NOT EXISTS user_education_detail 
//   ( 
//      user_education_detail_id SERIAL PRIMARY KEY, 
//      school_name              VARCHAR(40) NOT NULL, 
//      degree_name              VARCHAR(40) NOT NULL, 
//      major_fieldofstudy       VARCHAR(40) NOT NULL, 
//      start_date               DATE NOT NULL, 
//      end_date                 DATE, 
//      current                  BOOLEAN DEFAULT false, 
//      description              TEXT, 
//      FOREIGN KEY (user_education_detail_id) REFERENCES user_profile(id) 
//   ); 
//     `);
// };

// exports.down = function(knex, Promise) {
//   return knex.raw(`
//   CREATE TABLE IF NOT EXISTS user_education_detail 
//   ( 
//      user_education_detail_id SERIAL PRIMARY KEY, 
//      school_name              VARCHAR(40) NOT NULL, 
//      degree_name              VARCHAR(40) NOT NULL, 
//      major_fieldofstudy       VARCHAR(40) NOT NULL, 
//      start_date               DATE NOT NULL, 
//      end_date                 DATE, 
//      current                  BOOLEAN DEFAULT false, 
//      description              TEXT, 
//      FOREIGN KEY (user_education_detail_id) REFERENCES user_profile(id) 
//   ); 
//       `);
// };
exports.up = function(knex, Promise) {
   return knex.raw(`
   
     `);
 };
 
 exports.down = function(knex, Promise) {
   return knex.raw(`
   
       `);
 };