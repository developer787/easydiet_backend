var Customer = require('../models/Customer.js')
var Plato = require('../models/Platos.js')
var Chofer = require('../models/Choferes.js')



exports.create = function(req, res) {
  console.log(req.body)
  const customer = new Customer({
    _id: req.body.id,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    almuerzos: req.body.almuerzos,
    cenas: req.body.cenas,
    history: [],
    alergias: req.body.alergias
  })
  Customer.findById(customer._id, (err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    if (doc) {
      doc._id = customer._id
      doc.nombre = customer.nombre
      doc.apellido = customer.apellido
      doc.alergias = customer.alergias
      doc.almuerzos = customer.almuerzos
      doc.cenas = customer.cenas
      console.log("customer exists...updating", doc)
      doc.save(err => {
        if (err) {
          console.log(err)
        }
        else {
          res.json({
            message: "Cliente Actualizado"
          })
        }
      })

    }
    else {
      console.log("No customer found with that ID...inserting")
      customer.save(err => console.log(err))
      res.json({
        message: "Cliente Guardado Exitosamente!"
      })
    }

  })
}
exports.update = function(req, res) {
  console.log(req.body)
  const update = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    alergias: req.body.alergias,
    almuerzos: req.body.almuerzos,
    cenas: req.body.cenas
  }
  Customer.findByIdAndUpdate(req.body._id, req.body, { upsert: true }, function(err, doc) {
    if (err) {
      console.log(err)
    }
    res.json({
      message: update.nombre + ' fue actualizado!'
    })
  })
}
exports.deleteUser = function(req, res) {
  console.log(req.body)
  Customer.findByIdAndRemove(req.body._id, function(err, doc) {
    if (err) {
      console.log(err)
    }
    if (doc) {
      res.json({
        message: req.body.nombre + ' fue borrado!'
      })

    }
    else {
      res.json({
        message: 'No se localizo cliente.'
      })
    }

  })
}
exports.list = function(req, res) {
  Customer.find(function(err, users) {
    if (err) {
      console.log(err)
    }
    res.json({
      message: 'All found',
      users
    })
  });
}

// Platos API
exports.crearPlato = function(req, res) {
  console.log(req.body)
  const plato = new Plato({
    _id: req.body._id,
    nombre: req.body.nombre,
    ingredientes: req.body.ingredientes
  })
  Plato.findById(plato._id, (err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    if (doc) {
      doc.nombre = plato.nombre
      doc.alergias = plato.ingredientes
      console.log("plato exists...updating", doc)
      doc.save(err => {
        if (err) {
          console.log(err)
        }
        else {
          res.json({
            message: "Plato Actualizado",
            plato: plato
          })
        }
      })

    }
    else {
      console.log("No se encontro plato...inserting")
      res.json({
        message: "Plato Guardado Exitosamente!",
        plato: plato
      })
      plato.save(err => console.log(err))
    }

  })
}

exports.platosList = function(req, res) {
  Plato.find(function(err, platos) {
    if (err) {
      console.log(err)
    }
    res.json({
      message: 'All found',
      platos
    })
  });
}

// Choferes API
exports.crearChofer = function(req, res) {
  console.log(req.body)
  const chofer = new Chofer({
    _id: req.body.id,
    nombre: req.body.nombre,
    apellido: req.body.apellido
  })
  Customer.findById(chofer._id, (err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    if (doc) {
      doc._id = chofer._id
      doc.nombre = chofer.nombre
      doc.apellido = chofer.apellido
      console.log("customer exists...updating", doc)
      doc.save(err => {
        if (err) {
          console.log(err)
        }
        else {
          res.json({
            message: "Cliente Actualizado"
          })
        }
      })

    }
    else {
      console.log("No customer found with that ID...inserting")
      chofer.save(err => console.log(err))
      res.json({
        message: "Plato Guardado Exitosamente!"
      })
    }

  })
}

// Reportes API

exports.reporteSemanal = function(req, res) {
  Plato.find(function(err, platos) {
    if (err) {
      console.log(err)
    }
    Customer.find(function(err, users) {
      if (err) {
        console.log(err)
      }

      const combine = e => {
        const invalidos = []
        const { _id, nombre, apellido, alergias, almuerzos, cenas } = e
        const alergiaCheck = alergia => {
          const validos = []

          platos.map(plato => {

            if (plato.ingredientes.indexOf(alergia, 0) > -1) {
              if (invalidos.indexOf(plato.nombre, 0) > -1) {
                console.log('plato existe')

              }
              else {
                invalidos.push(plato.nombre)
              }

            }
          })
          return invalidos
        }

        const platosInvalidos = alergias.map(alergiaCheck)
        const platosDenegados = platosInvalidos.reduce((x, y) => x.findIndex(e => e.nombre == y.nombre) < 0 ? [...x, y] : x, [])
        console.log(almuerzos)
        const platosSugeridos = () => {
          for (let key in almuerzos) {
            console.log(almuerzos[key])
            const getRand = (min, max) => {
              min = Math.ceil(min)
              max = Math.floor(max)
              return Math.floor(Math.random() * (max - min)) + min
            }
            const platoCanasta = []
            while (platoCanasta.length < almuerzos[key]) {
              const x = getRand(0, platos.length)
              const randPlato = platos[x]
              console.log(x, platos.length, "--")
              if (platosDenegados.indexOf(randPlato.nombre, 0) > -1 || platoCanasta.indexOf(randPlato.nombre, 0) > -1) {
                const index = platosDenegados.indexOf(randPlato.nombre, 0)
                platoCanasta.splice(index, 1)

                console.log('cant push plate')

              }
              else {
                platoCanasta.push(randPlato.nombre)

              }
            }
            console.log(platoCanasta)
          }
        }
        platosSugeridos()
        return { _id, nombre, apellido, platosDenegados: platosDenegados[0] || [], almuerzos, cenas, platos }
      }
      const report = users.map(combine)
      res.json({
        message: 'All found',
        report
      })
    });
  });
}