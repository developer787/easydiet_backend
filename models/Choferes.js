var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var choferSchema = new Schema({
    _id: {type: Schema.Types.ObjectId},
    date: {type: Date, default: Date.now},
    nombre: {type: String, default: 'Anonimo'},
    apellido: {type: String, default: 'Del Pueblo'},
    almuerzos: {type: Object, default: {}},
    ruta : {type: Number, default: 0}
});

module.exports = mongoose.model('Choferes', choferSchema);
