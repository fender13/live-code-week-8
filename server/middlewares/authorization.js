const Apods = require('../models/apod')

module.exports = (req, res, next) => {
  Apods.
    findById({
      _id: req.params.id
    })
    .then((data) => {
      if (data) {
        if (data.UserId == req.userData.id) {
          next()
        } else {
          res.status(400).json({
            error:'DILARANG UPDATE!! BUKAN PUNYA LOE!!'
          })
        }
      } else {
        res.status(404).json({
          error: 'Data tidak ditemukan'
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message
      })
    })
}