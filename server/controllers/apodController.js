const Apods = require('../models/apod')

const axi = require('axios')
const axios = axi.create({
  baseURL: 'https://api.nasa.gov/planetary',
})

class ApodController {
  static getApods(req, res) {
    Apods
      .find({
        UserId: req.userData.id
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message
        })
      })
  }

  static getApodsById(req, res) {
    Apods
      .findById({
        _id: req.params.id
      })
      .then((data) => {
        if (data) {
          res.status(200).json(data)
        } else {
          throw `Data Tidak Ditemukan`
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }

  static saveApods(req, res) {
    const { date } = req.body

    Apods
      .create({
        date: date,
        explanation: 'a',
        media: 'a',
        title: 'a',
        UserId: req.userData.id
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(400).json({
          message: err.errors
        })
      })
  }

  static deleteApods(req, res) {
    const getId = { _id: req.params.id }

    Apods
      .findByIdAndDelete(getId)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static updateData(req, res) {
    const { date } = req.body
    let newApod
    axios
      .get(`/apod?date=${date}&api_key=${process.env.API}`)
      .then(({ data }) => {
        newApod = data

        const getId = { _id: req.params.id }

        Apods
          .findByIdAndUpdate(getId, {
            media: data.media_type,
            title: data.title,
            explanation: data.explanation,
            url: data.url,
            date: date
          })
          .then((data) => {
            Apods
              .findById(getId)
              .then((data) => {
                res.status(200).json(data)
              })
          })
      }) 
      .catch(({ response }) => {
        res.status(400).json({
          message: response.data
        })
      })
  }
}

module.exports = ApodController