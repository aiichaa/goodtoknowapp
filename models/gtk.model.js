var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var GTKSchema = new mongoose.Schema({
    action: String,
    fr_content: String,
    ar_content: String
})

GTKSchema.plugin(mongoosePaginate)
const GTK = mongoose.model('GTK', GTKSchema)

module.exports = GTK;