// exports.up = function(knex, Promise) {
//   return knex.raw(`
//   CREATE TABLE IF NOT EXISTS user_experience_detail 
//   ( 
//      user_experience_detail_id SERIAL PRIMARY KEY, 
//      job_title                 VARCHAR(40) NOT NULL, 
//      company_name              VARCHAR(40) NOT NULL, 
//      job_location              VARCHAR(40), 
//      start_date                DATE NOT NULL, 
//      end_date                  DATE, 
//      current                   BOOLEAN DEFAULT false, 
//      description               TEXT, 
//      FOREIGN KEY (user_experience_detail_id) REFERENCES user_profile(id)  
//   ); 
//     `);
// };

// exports.down = function(knex, Promise) {
//   return knex.raw(`
//   CREATE TABLE IF NOT EXISTS user_experience_detail 
//   ( 
//      user_experience_detail_id SERIAL PRIMARY KEY, 
//      job_title                 VARCHAR(40) NOT NULL, 
//      company_name              VARCHAR(40) NOT NULL, 
//      job_location              VARCHAR(40), 
//      start_date                DATE NOT NULL, 
//      end_date                  DATE, 
//      current                   BOOLEAN DEFAULT false, 
//      description               TEXT, 
//      FOREIGN KEY (user_experience_detail_id) REFERENCES user_profile(id)  
//   ); 
//       `);
// };
// exports.up = function(knex, Promise) {
//    return knex.raw(`
//    CREATE TABLE IF NOT EXISTS user_experience_detail 
//    ( 
//       user_experience_detail_id SERIAL PRIMARY KEY, 
//       job_title                 VARCHAR(40) NOT NULL, 
//       company_name              VARCHAR(40) NOT NULL, 
//       job_location              VARCHAR(40), 
//       start_date                DATE NOT NULL, 
//       end_date                  DATE, 
//       current                   BOOLEAN DEFAULT false, 
//       description               TEXT, 
//       FOREIGN KEY (user_experience_detail_id) REFERENCES user_profile(id)  
//    ); 
//      `);
//  };
 
//  exports.down = function(knex, Promise) {
//    return knex.raw(`
//    CREATE TABLE IF NOT EXISTS user_experience_detail 
//    ( 
//       user_experience_detail_id SERIAL PRIMARY KEY, 
//       job_title                 VARCHAR(40) NOT NULL, 
//       company_name              VARCHAR(40) NOT NULL, 
//       job_location              VARCHAR(40), 
//       start_date                DATE NOT NULL, 
//       end_date                  DATE, 
//       current                   BOOLEAN DEFAULT false, 
//       description               TEXT, 
//       FOREIGN KEY (user_experience_detail_id) REFERENCES user_profile(id)  
//    ); 
//        `);
//  };
exports.up = function(knex, Promise) {
   return knex.raw(`
   
     `);
 };
 
 exports.down = function(knex, Promise) {
   return knex.raw(`
   
       `);
 };
 