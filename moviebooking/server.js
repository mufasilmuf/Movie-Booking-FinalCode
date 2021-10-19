const express = require("express");
bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

//---------------MiddleWare...................................
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//---------------MiddleWare...................................

//---------------------it connect to data base-------------------
(async function () {
  const db = require("./app/models");
  let client;

  try {
    client = await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (err) {
    console.log("Cannot connect to the database!", err);
    process.exit(1);
  }
})();
//---------------------it connect to data base-------------------

//simple routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Upgrad Movie booking application development.",
  });
});

//Movies related routes begains..................
require("./app/routes/movie.routes")(app);
// app which is the express object
// is being passed as a paramter to the tutorial.routes
// As all the internal page routing for the application is being done
// by express in the  routes file.

//Genre related routes begains..................
require("./app/routes/genre.routes")(app);

//artists related routes begains..................
require("./app/routes/artist.routes")(app);

//users related routes begains................
require("./app/routes/user.routes")(app);

//set port...
const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Runnig on the port number:${PORT}`);
});
