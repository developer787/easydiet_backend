var express = require('express');
var router = express.Router();
var api = require('./api.js');


/* GET users listing. */
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
router.post('/', api.create)
router.post('/update', api.update)
router.post('/delete', api.deleteUser)
router.post('/crearplato', api.crearPlato)
router.post('/crearchofer', api.crearChofer)


router.get('/', api.list)
// router.post('/', function(req, res, next) {
//   console.log(req.body);
//   res.json({ body: 'Juan' });
// });

module.exports = router;
