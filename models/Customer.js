var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var customerSchema = new Schema({
    _id: {type: Schema.Types.ObjectId},
    date: {type: Date, default: Date.now},
    nombre: {type: String, default: 'Anonimo'},
    apellido: {type: String, default: 'Del Pueblo'},
    almuerzos: {type: Object, default: {}},
    cenas: {type: Object, default: {}},
    history: [],
    alergias: []
});

module.exports = mongoose.model('Customer', customerSchema);
