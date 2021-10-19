module.exports = (mongoose) => {
  const Movies = mongoose.model(
    "movies",
    mongoose.Schema({
      movieid: { type: Number, require: true },
      title: { type: String, require: true },
      published: { type: Boolean, require: true },
      released: { type: Boolean, require: true },
      poster_url: { type: String, require: true },
      release_date: { type: String, require: true },
      publish_date: { type: String, require: true },
      artists: [
        {
          artistid: { type: Number, require: true },
          first_name: { type: String, require: true },
          last_name: { type: String, require: true },
          wiki_url: { type: String, require: true },
        },
      ],
      genres: [{}],
      shows: [
        {
          id: { type: Number, require: true },
          theatre: [
            {
              name: { type: String, require: true },
              city: { type: String, require: true },
            },
          ],
          language: { type: String, require: true },
          show_timing: { type: String, require: true },
          available_seats: { type: String, require: true },
          unit_price: { type: Number, require: true },
        },
      ],
    })
  );
  return Movies;
};
