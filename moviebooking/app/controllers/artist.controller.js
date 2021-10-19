const db = require("../models");
const Artists = db.artists;

exports.findAllArtists = async (req, res) => {
  try {
    let data = await Artists.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "Internal error occured" });
  }
};
