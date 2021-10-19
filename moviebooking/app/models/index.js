//url for mongodb .....................
const dbconfig = require("../config/db.config");

//create a mongoose object as globally..
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbconfig.url;

db.genres = require("./genre.model")(mongoose);
db.artists = require("./artist.model")(mongoose);
db.movies = require("./movie.model")(mongoose);
db.users = require("./user.model")(mongoose);

module.exports = db;
