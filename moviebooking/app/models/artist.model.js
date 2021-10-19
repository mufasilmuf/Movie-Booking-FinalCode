module.exports = (mongoose) => {
  const Artists = mongoose.model(
    "artists",
    mongoose.Schema({
      artistid: {
        type: Number,
        require: true,
      },
      first_name: {
        type: String,
        require: true,
      },
      last_name: {
        type: String,
        require: true,
      },
      wiki_url: {
        type: String,
        require: true,
      },
    })
  );
  return Artists;
};
