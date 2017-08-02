var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var platosSchema = new Schema({
    _id: {type: Schema.Types.ObjectId},
    date: {type: Date, default: Date.now},
    nombre: {type: String, default: 'Sin Nombre'},
    ingredientes: [],
    ranking: {type: Number}
});

module.exports = mongoose.model('Plato', platosSchema);