const express = require("express");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");   // the csv will be connected


// this will make the express functional
const app = express();

// middleware to trnafer the data from form
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// simple validation function to read the data form
function validateData(d) {
  return (
    /^[a-zA-Z0-9]{1,20}$/.test(d.first_name) &&
    /^[a-zA-Z0-9]{1,20}$/.test(d.second_name) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
    /^[0-9]{10}$/.test(d.phone_number) &&
    /^[0-9][a-zA-Z0-9]{5}$/.test(d.eircode)
  );
}

// function to find the csv and print a message if this is not working
function importCSV(csvFilePath) {
  if (!fs.existsSync(csvFilePath)) {
    console.error(`File was not found or is not working ${csvFilePath}`);
    return;
  }

  let rowNumber = 1;

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      rowNumber++;

      // The trim will be use to avoid any unnecesary space
      const record = {
        first_name: String(row.first_name).trim(),
        second_name: String(row.second_name).trim(),
        email: String(row.email).trim(),
        phone_number: String(row.phone_number).trim(),
        eircode: String(row.eircode).trim(),
      };

      // validation before database insert
      if (!validateData(record)) {
        console.error(`Invalid data at row ${rowNumber}`);
        return;
      }

      // Error message that will show if the database is working
      db.query(
        "INSERT INTO mysql_table (first_name, second_name, email, phone_number, eircode) VALUES (?, ?, ?, ?, ?)",
        [
          record.first_name,
          record.second_name,
          record.email,
          record.phone_number,
          record.eircode,
        ],
        (err) => {
          if (err) {
            console.error(`Database is not working ${rowNumber}:`, err.message);
          }
        }
      );
    })
    .on("end", () => {
      console.log("CSV import finished");
    });
}

// export the data without change the infraesctruture of the document
module.exports = { app, importCSV };
