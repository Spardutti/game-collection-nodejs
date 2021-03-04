let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let gameSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  company: { type: Schema.Types.ObjectID, ref: "Company", },
  rating: { type: Number },
  status: {
    type: String,
    enum: ["Completed", "Playing", "Wish List", "Collecting Dust"],
    default: "Playing",
  },
  genre: { type: Schema.Types.ObjectID, ref: "Genre" },
  description: { type: String },
});

gameSchema.virtual("url").get(function () {
  return "/home/games/" + this._id;
});

module.exports = mongoose.model("Game", gameSchema);
