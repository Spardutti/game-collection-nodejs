let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let genreSchema = new Schema({
    name: String    
})

genreSchema.virtual("url").get(function () {
    return "/home/genre/" + this._id
})

module.exports = mongoose.model("Genre", genreSchema);