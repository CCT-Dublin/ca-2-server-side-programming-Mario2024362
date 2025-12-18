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
// a message will be print if the connection is workin or not 
data.connect((err)=>{
    //if there is any error with the database connection
    if(err){
console.error.apply("Error connection failed:" , err.message);
return;
}
//if everything is working will print this
console.log("Connection with database is working");

})
//export the database connection
MediaSourceHandle.exports={
    data,
}
