const mongoose = require('mongoose')

const axi = require('axios')
const axios = axi.create({
  baseURL: 'https://api.nasa.gov/planetary',
})

const schema = mongoose.Schema

const ApodsSchema = new schema({
  date: {
    type: String,
    required: true
  }, 
  explanation: {
    type: String,
    required: true
  },
  url: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  media: {
    type: String,
    required: true
  },
  UserId: {
    type: schema.Types.ObjectId,
    required: true
  }
})

ApodsSchema.pre('save', function(next) {
  var apods = this

  axios
    .get(`/apod?date=${apods.date}&api_key=${process.env.API}`)
    .then(({ data }) => {
      if (data) {
        apods.media = data.media_type
        apods.title = data.title
        apods.explanation = data.explanation
        apods.url = data.url
        next()
      } else {
        throw 'Sudah ada di database'
      }
    })
    .catch(({ response }) => {
      res.status(400).json({
        err: response
      })
    })
})

ApodsSchema.path('date').validate(function (value, respond) {
  return mongoose
    .model('Apods')
    .collection
    .countDocuments({ date: value })
    .then(function (count) {
      if (count > 0) {
        return false
      }
    })
    .catch(function (err) {
      throw err
    })
}, 'Date already exists!!')

var Apods = mongoose.model('Apods', ApodsSchema)

module.exports = Apods