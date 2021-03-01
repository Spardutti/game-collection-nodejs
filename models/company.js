let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let companySchema = new Schema({
    name: { type: String, required: true, maxlength: 100 },
    year: { type: Date, required: true },
    description: {type: String, required: true}
})

companySchema.virtual("url").get(function () {
    return "/catalog/company/" + this._id;
})


module.exports = mongoose.model("Company", companySchema);