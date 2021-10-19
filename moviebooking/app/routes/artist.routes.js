module.exports = (app) => {
  const artists = require("../controllers/artist.controller");

  const router = require("express").Router();

  router.get("/artists", artists.findAllArtists);

  app.use("/api", router);
};
