//Import of the dependencies 

const express = require("express"); // this will import the web server
const path = require("path"); // the path of the files will be imported
const fs = require("fs"); // fs is to help to import the CSV support
const { data } = require("./database");  //he connection with the MySQL will be import from here
const csv = require("csv-parser");   // the csv will be connected

// this will make the express functional
const app = express();

// middleware to transfer the data in the file form
app.use(express.urlencoded({ extended: true })); // this define the data from form
app.use(express.static(__dirname));

// open the form using the url
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html")); // it swill show the form using the port
});

// simple validation function to read the data form
function validateData(d) {
  return (
    /^[a-zA-Z0-9]{1,20}$/.test(d.first_name) &&  //validation to confirm the name will be of 20 characters and will have letters and numbers
    /^[a-zA-Z0-9]{1,20}$/.test(d.second_name) && 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) && 
    /^[0-9]{10}$/.test(d.phone_number) && //phone validation will be just numbers and must be of 10 characters
    /^[0-9][a-zA-Z0-9]{5}$/.test(d.eircode) //Eircode should be 6 characters long 
  );
  //This will avoid invalid data
}

//this will import the data after the button of submission is click
app.post("/submit", (req, res) => {

  // validation before database insert
  if (!validateData(req.body)) {
    return res.send("Invalid data and the page is not working");
  }

  // Error messaSge that will show if the database is working
  data.query(
    //This will insert the data into the query of the database
    "INSERT INTO mysql_table (first_name, second_name, email, phone_number, eircode) VALUES (?, ?, ?, ?, ?)",
    [
      //Follow the same structure of prepared statements
      req.body.first_name,
      req.body.second_name,
      req.body.email,
      req.body.phone_number,
      req.body.eircode,
    ],
    //message to confirm the database is working
    (err) => {
      if (err) {
        console.error("Database is not working:", err.message);
        return res.send("Database error");
      }
     res.redirect("Data was sent") // it wil shot when the correct data is submit
    }
  );
});

// function to find the csv and print a message if this is not working
function importCSV(csvFilePath) { //import the cvs path like the users information
  if (!fs.existsSync(csvFilePath)) { //search for the csv file to make the input of data
    console.error(`File was not found or is not working ${csvFilePath}`);
    return;
  }
//it will show the row of information that is being read
  let rowNumber = 1;
//open the csv file and read it
  fs.createReadStream(csvFilePath)
    .pipe(csv())  // send thed ata of the file
    .on("data", (row) => {
      rowNumber++; // the sequence is increased when the data is read

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

      // Error message that will show if the database is not working
      data.query(
        "INSERT INTO mysql_table (first_name, second_name, email, phone_number, eircode) VALUES (?, ?, ?, ?, ?)",
        [
          //Using the query of the database to check the information
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
    //If there is any import that is a success it will shos that message
    .on("end", () => {
      console.log("CSV import finished");
    });
}

// export the data without change the infraesctruture of the document
module.exports = { app, importCSV };


