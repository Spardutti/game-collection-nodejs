let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let genreSchema = new Schema({
    
    genre: {enum: ["Fantasy", "Role Playing", "Action", "FPS"]}
})

genreSchema.virtual("url").get(function () {
    return "/catalog/genre/" + this._id
})

module.exports = mongoose.model("Genre", genreSchema);