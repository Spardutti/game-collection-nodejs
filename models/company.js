let mongoose = require("mongoose");
const { DateTime } = require("luxon");

let Schema = mongoose.Schema;

let CompanySchema = new Schema({
    name: { type: String, required: true, maxlength: 100 },
    year: { type: Date, required: true },
    description: {type: String, required: true}
})

CompanySchema.virtual("url").get(function () {
    return "/home/companies/" + this._id;
})

CompanySchema.virtual("yearFormatted").get(function() {
    return DateTime.fromJSDate(this.year).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model("Company", CompanySchema);