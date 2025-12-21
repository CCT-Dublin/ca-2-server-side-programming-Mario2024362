// created the import and the connection of the database
const mysql= require("mysql2");

//Make the connection with the database
const data=mysql.createconnection({
//Information  to identified the database that want to be connect
     host:"localhost",  
    user:"root",
    password:"362.Martinez",
    database: "Personal_information",

});
function ensureSchema(callback) {
  const sql = `
    CREATE TABLE IF NOT EXISTS mysql_table (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(30),
      second_name VARCHAR(30),
      email VARCHAR(80),
      phone_number VARCHAR(10),
      eircode VARCHAR(6)
    )
  `;
  db.query(sql, callback);
}



//export the database connection
MediaSourceHandle.exports={
    data,
}
