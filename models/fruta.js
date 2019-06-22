'use state'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FrutaSchema = Schema({
    nombre: String,
    color: String,
    temporada: Boolean,
})

module.exports = mongoose.model('Fruta', FrutaSchema)