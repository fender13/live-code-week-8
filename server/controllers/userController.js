const User = require('../models/user')
const jwt = require('jsonwebtoken')

const comparePassword = require('../helpers/comparePassword')

class UserController {
  static userRegister(req, res) {
    const { email, password } = req.body

    User.create({
      email: email,
      password: password
    })
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      let errors = {}

      if (err.errors.email != undefined || err.errors.password != undefined) {
        errors.email = err.errors.email
        errors.password = err.errors.password
        
        res.status(400).json(errors)
      } else {
        res.status(500).json({
          message: `Terjadi kesalahan pada server..Cobalah beberapa saat lagi!!!`
        })
      }
    })
  }

  static userLogin(req, res) {
    const { email, password } = req. body
    let dataUser

    User.findOne({
      email: email
    })
      .then((user) => {
        dataUser = user
        if (!user) {
          throw 'EMAIL ATAU PASSWORD ANDA SALAH'
        } else {
          return comparePassword(password, dataUser.password)
        }
      })
      .then((result) => {
        if (!result) {
          throw 'EMAIL ATAU PASSWORD ANDA SALAH'
        } else {
          const payload = {
            id: dataUser._id,
            email: dataUser.email
          }
          const token = jwt.sign(payload, process.env.JWT_SECRET)
          res.status(200).json({
            accessToken: token,
            id: dataUser._id,
            email: dataUser.email
          })
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }
}

module.exports = UserController