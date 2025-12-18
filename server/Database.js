// created the import and the connection of the database
const mysql= require("mysql12");

//Make the connection with the database
const data=mysql.createconnection({
//Information  to identified the database that want to be connect
     host:"localhost",  
    user:"root",
    password:"",
    database: "Personal_information(1)",

});
data.connect((err)=>{




})
