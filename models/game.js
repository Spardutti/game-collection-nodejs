let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let gameSchema = new Schema({
    name: { type: String, required: true, maxlength: 100 },
    company: { type: Schema.Types.ObjectID, ref: "Company", required: true },
    rating: { type: Number },
    status: { enum: ["Completed", "Playing", "Wish List", "Collecting Dust"] },
    genre: { type: Schema.Types.ObjectID, ref: "Genre" },
    description: {type: String}
})

gameSchema.virtual("url").get(function () {
    return "catalog/game/" + this._id
})

module.exports = mongoose.model("Game", gameSchema );

