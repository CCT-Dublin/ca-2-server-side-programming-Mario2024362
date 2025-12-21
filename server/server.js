//imports  and start the server of the database
const{ensureSchema}= require("./database");
const{app, importCSV}= require("./index");

//Port to access and conect the form
const PORT=3000;



//This will show the link if the server can be connected 
ensureSchema(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });             //link to access the form
});