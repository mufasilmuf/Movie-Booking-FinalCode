const db = require("../models");
const Movies = db.movies;

//Retrieve all the movies in the data base..
exports.findAllMovies = async (req, res) => {
  try {
    let data = await Movies.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Internal error occured",
    });
  }
};

//Retrieve movies using the "movieid" the data base..
exports.findOne = async (req, res) => {
  try {
    let data = await Movies.find({ movieid: req.params.movieid });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Internal error occured",
    });
  }
};

//Retrieve the movies shows using the movieid in the data base..
exports.findShows = async (req, res) => {
  try {
    let data = await Movies.find(
      { movieid: req.params.movieid },
      { _id: 0, shows: 1 }
    );
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Internal error occured",
    });
  }
};

//Retrieve all the movies status is published is true the data base..
exports.findAllpublished = async (req, res) => {
  try {
    let data = await Movies.find({ published: true });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Internal error occured",
    });
  }
};

//Retrieve all the movies status is released is true the data base..
exports.findAllreleased = async (req, res) => {
  try {
    let data = await Movies.find({ released: true });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Internal error occured",
    });
  }
};

exports.getCouponCode = async (req, res) => {
  // if user is logged in
  if (!req.header("Authorization")) {
    res.status(400).json({ message: "Invalid user" });
    return;
  }
  const couponCode = parseInt(req.query.code, 10);
  if (couponCode === NaN) {
    res.status(404).json({ message: "Invalid coupon code" });
    return;
  }
  const accesstoken = req.header("Authorization").split("Bearer ")[1];
  if (couponCode) {
    try {
      // finding the coupon code
      const user = await User.findOne({ accesstoken });
      const coupon = user.coupens.filter((item) => item.id === couponCode)[0];
      if (!coupon) {
        res.status(404).json({ message: "Coupon not available" });
        return;
      }
      res.status(200).json({ discountValue: coupon.discountValue });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "User invalid" });
    }
  } else {
    res.status(400).json({ message: "Missing coupon code" });
  }
};
