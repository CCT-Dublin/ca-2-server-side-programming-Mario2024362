
const express = require("express");
const path= require("path");

//Port to access and conect the form
const app= express();
const PORT=3000;

//function to find the csv and print a message if this is not working
function importCSV(csvFilePath) {
  if (!fs.existsSync(csvFilePath)) {
    console.error(`File was not found or is not working ${csvFilePath}`);
    return;
  
}
//The trim will be use to avoid any unnecesary space
const record = {
        first_name: String(row.first_name ).trim(),
        second_name: String(row.second_name).trim(),
        email: String(row.email ).trim(),
        phone_number: String(row.phone_number).trim(),
        eircode: String(row.eircode ).trim(),
      };
//Error message that will show if the database is working

 db.query(
        "INSERT INTO mysql_table (first_name, second_name, email, phone_number, eircode) VALUES (?, ?, ?, ?, ?)",
        [record.first_name, record.second_name, record.email, record.phone_number, record.eircode],
        (err) => {
          if (err) console.error(`Database is not working${rowNumber}:`, err.message);
        }
      );


}