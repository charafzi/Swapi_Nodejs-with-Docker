const { Schema, model } = require("mongoose");

const filmSchema = new Schema({
  title: String, 
  episode_id: String,
  director: String,
  producer: String, 
  release_date: String,
});

const Film = model("Film", filmSchema);

module.exports = Film;


