let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CompanySchema = new Schema({
    name: { type: String, required: true, maxlength: 100 },
    year: { type: Date, required: true },
    description: {type: String, required: true}
})

CompanySchema.virtual("url").get(function () {
    return "/home/companies/" + this._id;
})


module.exports = mongoose.model("Company", CompanySchema);