const db = require("../models");
const Genre = db.genres;

exports.findAllGenres = async (req, res) => {
  try {
    let data = await Genre.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "Internal error occured" });
  }
};
