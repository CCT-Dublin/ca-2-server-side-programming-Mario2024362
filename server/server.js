const{ensureScheme}= require("/database");
const{app, importCSV}= require("/index");
const path= require("path");
//Port to access and conect the form
const PORT=3000;
//This will show the link if the server can be connected or will be print the rror message
app.listen(PORT, () => {
    console.log(`Server is running  http://localhost:${PORT}`);
  }).on("error", () => {
    console.log("The server is not working");
  });
