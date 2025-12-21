// created the import and the connection of the database
const mysql= require("mysql2");

//Make the connection with the database
// data is the varaible that represents the database
const data=mysql.createConnection({
//Information  to identified the database that want to be connect
     host:"localhost",  //Host where the database is store
    user:"root",         //the user in the workbench
    password:"362.Martinez",  //password to access the sql 
    database: "personal_table", //name of the database
});
// connect and show the login status of the database with the server
data.connect((err) => {
  if (err) {    //If the database can not be connected will print an error message
    console.error("connection failed with the database", err.message);
  } else {
    console.log("database connection is good");
  }
})



//The scheme make suere the table of the data was created
// the callback will theargument to a function
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
  data.query(sql, callback); //the sql with the callback will make the connection portable
}



//export the database connection to the another files
module.exports = { data, ensureSchema };
