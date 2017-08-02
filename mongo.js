var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var mongoDB = mongoose.connect('mongodb://kiko:easydiet1234@ds023932.mlab.com:23932/easydiet_customers', {
    useMongoClient: true
});

mongoDB
    .then(function (db) {
        console.log('mongodb has been connected');
    })
    .catch(function (err) {
        console.log('error while trying to connect with mongodb');
    });

module.exports = mongoDB;