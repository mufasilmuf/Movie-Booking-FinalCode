module.exports = (app) => {
  const movies = require("../controllers/movie.controller");

  var router = require("express").Router();

  router.get("/movies", movies.findAllMovies);

  router.get("/movies/:movieid", movies.findOne);

  router.get("/shows/:movieid", movies.findShows);

  router.get("/movies?status=PUBLISHED", movies.findAllpublished);

  router.get("/movies?status=RELEASED", movies.findAllreleased);

  router.get("/coupons", movies.getCouponCode);

  app.use("/api", router);
};
