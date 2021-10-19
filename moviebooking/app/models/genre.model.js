module.exports = (mongoose) => {
  const Genre = mongoose.model(
    "genres",
    mongoose.Schema({
      genreid: { type: Number, require: true },
      genre: { type: String, require: true },
    })
  );
  return Genre;
};
