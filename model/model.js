let mongoose = require('mongoose');
let adminSchema = mongoose.Schema({
    PageUrl : String,
    PageTitle :String,
    PageMetaDescription :String,
    PageMetaKeyword :String,
    PageHeading : String,
    PagePhoto :String,
    PageDetails :String
})

let adminModel = mongoose.model('table', adminSchema);

module.exports = adminModel